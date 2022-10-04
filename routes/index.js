const express = require('express');

const router = express.Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');
const { NotFoundError } = require('../errors/NotFoundError');
const { pageNotFoundMessage, loggedOutMessage } = require('../constants/constants');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.post('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: loggedOutMessage });
});

router.use((req, res, next) => {
  next(new NotFoundError(pageNotFoundMessage));
});

module.exports = router;
