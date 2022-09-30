const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new AuthorizationError('Incorrect email or password'));
    }

    const matchedPasswords = await bcript.compare(password, user.password);

    if (!matchedPasswords) {
      return next(new AuthorizationError('Incorrect email or password'));
    }
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'SECRET',
      { expiresIn: '7d'},
    );

    return res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    }).send(user.toJSON());
  } catch (err) {
    return next(err);
  }
};

const createUser = async (req, res, next) => {
  const { password, ...userData } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ password: hashedPassword, ...userData });
    return res.status(201).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Validation error. Incorrect data sent'));
    }
    if (err.code === 11000) {
      return next(new ConflictError('Such an Email exists'));
    }
    return next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new NotFoundError('This user does not exist'))
    }
    return res.send(user);
  } catch (err) {
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