const allowedCors = [
  'http://localhost:3000',
  'https://localhost:3000',
  'https://maxooin.nomoredomains.work',
  'http://maxooin.nomoredomains.work',
  'https://api.maxooin.nomoredomains.work',
  'http://api.maxooin.nomoredomains.work'
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

export const cors = (req, res, next) => {
  const {origin} = req.headers;
  const {method} = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
};
