const mongoose = require('mongoose');
const validator = require('validator');

const userShema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'The field "email" must be filled'],
    validate: [validator.isEmail, 'Invalid email address'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'The field "password" must be filled'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Minimum field length "name" - 2'],
    maxlength: [2, 'Maximum field length "name" - 30'],
    default: 'Александр',
  }
});

userShema.method.toJSON = function deletePassword() {
  const user = this.toObject();

  delete user.password;

  return user;
};

module.exports = mongoose.model('user', userShema);