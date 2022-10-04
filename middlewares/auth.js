const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET_DEV } = require('../constants/config');
const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../errors/AuthorizationError');
const { authorizationRequiredMessage } = require('../constants/constants');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    return next(new AuthorizationError(authorizationRequiredMessage));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
