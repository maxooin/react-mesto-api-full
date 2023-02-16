import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {celebrate, errors, Joi} from 'celebrate';
import usersRouter from './routes/user.js';
import cardRouter from './routes/card.js';
import {createUser, login, logout} from './controllers/user.js';
import auth from './middlewares/auth.js';
import NotFoundError from './errors/NotFoundError.js';
import centralizedError from './middlewares/centralizedError.js';
import urlRegex from './utils/constants.js';
import {errorLogger, requestLogger} from './middlewares/logger.js';

const {PORT = 3000} = process.env;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/mestodb')
  .catch((err) => {
    console.log(`Connection to database was failed with error ${err}`);
  });
const allowedCors = [
  'http://localhost:3001',
  'https://maxooin.nomoredomains.work',
  'http://maxooin.nomoredomains.work',
  'https://api.maxooin.nomoredomains.work',
  'http://api.maxooin.nomoredomains.work'
]
app.use((req, res, next) => {
  const {method} = req;
  const {origin} = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
});

app.use(requestLogger);

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

app.get('/logout', logout);

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
