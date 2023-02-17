import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';

export const { JWT_SECRET = 'bdafc34bb7ca95383226b7a46f7e846fb57e0de2c18991828b40129d9b13c183' } = process.env;

function auth(req, res, next) {
  const { cookies } = req;

  if (cookies && cookies.jwt) {
    const token = cookies.jwt;
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      next(new UnauthorizedError('Передан не верифицированый токен'));
    }
    req.user = payload;
    next();
  } else {
    next(new UnauthorizedError('Отсутствует авторизационный заголовок или cookies'));
  }
}

export default auth;
