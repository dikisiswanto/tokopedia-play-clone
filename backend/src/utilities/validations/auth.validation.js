const { checkSchema } = require('express-validator');

const postUserAuth = checkSchema({
  username: {
    in: 'body',
    trim: true,
    notEmpty: {
      errorMessage: 'Username is required',
    },
  },
  password: {
    in: 'body',
    trim: true,
    notEmpty: {
      errorMessage: 'Password is required',
    },
  },
});

module.exports = {
  postUserAuth,
};
