const { celebrate, Joi } = require('celebrate');

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.obgect().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    county: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().url(),
    trailerLink: Joi.string().required().url(),
    thumbnail: Joi.string().required().url(),
    owner: Joi.string().alphanum().length(24),
    movieId: Joi.string().alphanum().length(24), //TODO: id фильма, который содержится в ответе сервиса MoviesExplorer
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateMovieById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  validateLogin,
  validateCreateUser,
  validateUpdateUser,
  validateCreateMovie,
  validateMovieById,
};
