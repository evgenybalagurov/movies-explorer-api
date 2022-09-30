const express = require('express');
const mongoose = require('mongoose');

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
