const jwt = require('jsonwebtoken');
const { USERNAME, PASSWORD, SESSION_SECRET_KEY } = require('../config');

const authenticate = ({ username, password }) => {
  if (username === USERNAME && password === PASSWORD) {
    return jwt.sign({ username }, SESSION_SECRET_KEY, { expiresIn: '12h' });
  }

  throw new Error('Failed to login. Please check your credentials.');
};

module.exports = {
  authenticate,
};
