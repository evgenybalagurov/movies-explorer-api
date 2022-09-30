const express = require('express');

const router = express.Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');

router.post('/signin', login);
router.post('/signup', createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

module.exports = router;
