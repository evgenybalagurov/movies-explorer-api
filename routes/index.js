const express = require('express');

const router = express.Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.post('/signout', (req,res) => {
  res.clearCookie('jwt').send({ message: 'Logged out' });
});

module.exports = router;
