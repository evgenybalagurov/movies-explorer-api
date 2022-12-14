require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');
const cors = require('./middlewares/cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000, NODE_ENV, MONGO_URL } = process.env;
const { MONGO_URL_DEV } = require('./constants/config');

const app = express();

const connect = async (next) => {
  try {
    await mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : MONGO_URL_DEV, {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
    await app.listen(PORT);
  } catch (err) {
    next(err);
  }
};

connect();

app.use(helmet());

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(limiter);

app.use(cors);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);
