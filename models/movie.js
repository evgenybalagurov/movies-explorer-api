const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'The field "county" must be filled'],
  },
  director: {
    type: String,
    required: [true, 'The field "director" must be filled'],
  },
  duration: {
    type: Number,
    required: [true, 'The field "duration" must be filled'],
  },
  year: {
    type: String,
    required: [true, 'The field "year" must be filled'],
  },
  description: {
    type: String,
    required: [true, 'The field "description" must be filled'],
  },
  image: {
    type: String,
    required: [true, 'The field "image" must be filled'],
    validate: [validator.isURL, 'Invalid Url address'],
  },
  trailerLink: {
    type: String,
    required: [true, 'The field "trailerLink" must be filled'],
    validate: [validator.isURL, 'Invalid Url address'],
  },
  thumbnail: {
    type: String,
    required: [true, 'The field "thumbnail" must be filled'],
    validate: [validator.isURL, 'Invalid Url address'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, 'The field "nameRU" must be filled'],
  },
  nameEN: {
    type: String,
    required: [true, 'The field "nameEN" must be filled'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
