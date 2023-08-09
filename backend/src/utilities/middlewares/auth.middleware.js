/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { SESSION_SECRET_KEY } = require('../../config');
const { handleClientError } = require('../responseHandler');

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return handleClientError(res, 401, 'Authorization token not provided');
  }

  jwt.verify(token, SESSION_SECRET_KEY, (err, user) => {
    if (err) {
      return handleClientError(res, 401, 'Token is not valid');
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
