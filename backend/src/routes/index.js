const express = require('express');

const router = express.Router();
const channelRoutes = require('./channel.router');
const productRoutes = require('./product.router');
const commentRoutes = require('./comment.router');
const videoRoutes = require('./video.router');

const routes = [...channelRoutes, ...productRoutes, ...commentRoutes, ...videoRoutes];

routes.forEach((route) => {
  const { method, path, validator, handler } = route;
  if (validator) {
    router[method](path, validator, handler);
  } else {
    router[method](path, handler);
  }
});

module.exports = router;
