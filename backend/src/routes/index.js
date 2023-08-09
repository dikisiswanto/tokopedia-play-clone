const express = require('express');

const router = express.Router();
const channelRoutes = require('./channel.router');
const productRoutes = require('./product.router');
const commentRoutes = require('./comment.router');
const videoRoutes = require('./video.router');
const authRoutes = require('./auth.router');
const authenticationMiddleware = require('../utilities/middlewares/auth.middleware');
const { handleResponse } = require('../utilities/responseHandler');

const routes = [
  ...channelRoutes,
  ...productRoutes,
  ...commentRoutes,
  ...videoRoutes,
  ...authRoutes,
];

routes.forEach((route) => {
  const { method, path, isPrivate, validator, handler } = route;
  const middlewares = [];
  if (isPrivate) {
    middlewares.push(authenticationMiddleware);
  }
  if (validator) {
    middlewares.push(validator);
  }

  router[method](path, middlewares, handler);
});

router.get('/csrf', (req, res) => {
  const csrfToken = req.csrfToken();

  return handleResponse(res, 200, 'Data retrieved successfully', { csrfToken });
});

module.exports = router;
