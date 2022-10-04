const ERROR_SERVER_CODE = 500;
const ERROR_CONFLICT_CODE = 400;
const ERROR_NOT_FOUND_CODE = 404;
const ERROR_FORBIDDEN_CODE = 403;
const ERROR_UNAUTORIZED_CODE = 401;
const ERROR_DATA_CODE = 400;

const validationErrorMessage = 'Validation error. Incorrect data sent';
const notFoundMovieErrorMessage = 'This movie does not exist';
const notFoundUserErrorMessage = 'This user does not exist';
const forbiddenMovieErrorMessage = 'This movie is another user';
const castMovieErrorMessage = 'Invalid movie id';
const castUserErrorMessage = 'Invalid user id';
const authorizationErrorMessage = 'Incorrect email or password';
const conflictErrorMessage = 'Such an Email exists';

module.exports = {
  ERROR_SERVER_CODE,
  ERROR_CONFLICT_CODE,
  ERROR_NOT_FOUND_CODE,
  ERROR_FORBIDDEN_CODE,
  ERROR_UNAUTORIZED_CODE,
  ERROR_DATA_CODE,
  validationErrorMessage,
  notFoundMovieErrorMessage,
  notFoundUserErrorMessage,
  forbiddenMovieErrorMessage,
  castMovieErrorMessage,
  castUserErrorMessage,
  authorizationErrorMessage,
  conflictErrorMessage,
};
