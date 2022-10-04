const { ERROR_SERVER_CODE, serverErrorMessage } = require('../constants/constants');

const errorHandler = (err, req, res, next) => {
  const {
    statusCode = ERROR_SERVER_CODE,
    message = serverErrorMessage,
  } = err;

  res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;
