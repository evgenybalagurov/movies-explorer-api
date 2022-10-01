const { NODE_ENV, JWT_SECRET } = prosess.env;
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET');
  } catch (err) {
    //TODO
  }

  req.user = payload;

  return next();
};

module.exports = auth;
