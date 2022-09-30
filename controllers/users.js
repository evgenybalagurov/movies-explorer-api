const User = require('../models/user');

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new NotFoundError('This user does not exist'))
    }
    return res.send(user);
  } catch {
    if (err.name === 'CastError') {
      return next(new CastError('Invalid card id'));
    }
    return next(err);
  }
}

const updateUser = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { email, name }, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return next(new NotFoundError('This user does not exist'));
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new CastError('Invalid card id'));
    }
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Validation error. Incorrect data sent'));
    }
    return next(err);
  }
}

module.exports = {
  getUser,
  updateUser,
}