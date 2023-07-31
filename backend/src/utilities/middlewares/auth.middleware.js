/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { SESSION_SECRET_KEY } = require('../../config');
const { handleClientError } = require('../responseHandler');

const jwtSecretKey = SESSION_SECRET_KEY;

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return handleClientError(res, 401, 'Authorization token not provided');
  }

  jwt.verify(token, jwtSecretKey, (err, user) => {
    if (err) {
      return handleClientError(res, 401, 'Token is not valid');
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
