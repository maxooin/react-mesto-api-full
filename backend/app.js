import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {celebrate, errors, Joi} from 'celebrate';
import usersRouter from './routes/user.js';
import cardRouter from './routes/card.js';
import {createUser, login} from './controllers/user.js';
import auth from './middlewares/auth.js';
import NotFoundError from './errors/NotFoundError.js';
import centralizedError from './middlewares/centralizedError.js';
import urlRegex from './utils/constants.js';
import {errorLogger, requestLogger} from './middlewares/logger.js';
import {cors} from "./middlewares/cors.js";

const {PORT = 3000} = process.env;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/mestodb')
  .catch((err) => {
    console.log(`Connection to database was failed with error ${err}`);
  });

app.use(cors);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required(),
    }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
      name: Joi.string()
        .min(2)
        .max(30),
      about: Joi.string()
        .min(2)
        .max(30),
      avatar: Joi.string()
        .regex(urlRegex)
        .uri({scheme: ['http', 'https']}),
    }),
}), createUser);

app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardRouter);
app.all('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(centralizedError);

app.listen(PORT, () => {
  console.log(`App listen on PORT ${PORT}`);
});
