const mongoose = require('mongoose');
const validator = require('validator');
const { invalidEmailMessage } = require('../constants/constants');

const userShema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, invalidEmailMessage],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userShema.methods.toJSON = function deletePassword() {
  const user = this.toObject();

  delete user.password;

  return user;
};

module.exports = mongoose.model('user', userShema);
