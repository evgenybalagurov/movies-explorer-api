const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();

const connect = async (next) => {
  try {
    await mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
    console.log('MongoDB connected!');

    await app.listen(PORT);
    console.log(`App listening on port ${PORT}`);
  } catch (err) {
    next(new Error('Filed to connect:', err.message));
  }
};

connect();

app.use(express.json());
app.use(cookieParser);

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);
