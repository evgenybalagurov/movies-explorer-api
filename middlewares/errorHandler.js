const { ERROR_SERVER_CODE, serverErrorMessage } = require('../constants/constants');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || ERROR_SERVER_CODE;
  const message = statusCode === ERROR_SERVER_CODE ? serverErrorMessage : err.message;

  res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;
