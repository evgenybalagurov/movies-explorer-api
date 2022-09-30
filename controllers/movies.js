const Movie = require('../models/movie');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({}); //TODO нужно вывести фильмы текущего user
    return res.send(movies);
  } catch (err) {
    return next(err);
  }
};

const createMovie = async (req, res, next) => {
  const { owner, ...movieData } = req.body;
  try {
    const movie = await Movie.create({ owner: req.user._id, ...movieData });
    return res.status(201).send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Validation error. Incorrect data sent'));
    }
    return next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return next(new NotFoundError('This movie does not exist'));
    }
    if (req.user._id !== movie.owner.toString()) {
      return next(new ForbiddenError('This movie is another user'));
    }
    await movie.remove();
    return res.send(movie);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new CastError('Invalid movie id'));
    }
    return next(err);
  }
};
