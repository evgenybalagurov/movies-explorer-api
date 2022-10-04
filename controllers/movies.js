const Movie = require('../models/movie');
const { ValidationError } = require('../errors/ValidationError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { CastError } = require('../errors/CastError');
const {
  validationErrorMessage,
  notFoundMovieErrorMessage,
  forbiddenMovieErrorMessage,
  castMovieErrorMessage,
} = require('../constants/constants');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    return res.send(movies);
  } catch (err) {
    return next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({ ...req.body, owner: req.user._id });
    return res.status(201).send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError(validationErrorMessage));
    }
    return next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params._id);
    if (!movie) {
      return next(new NotFoundError(notFoundMovieErrorMessage));
    }
    if (req.user._id !== movie.owner.toString()) {
      return next(new ForbiddenError(forbiddenMovieErrorMessage));
    }
    await movie.remove();
    return res.send(movie);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new CastError(castMovieErrorMessage));
    }
    return next(err);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
