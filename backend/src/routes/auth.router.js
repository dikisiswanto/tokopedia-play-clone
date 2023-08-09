const AuthController = require('../controllers/auth.controller');

const routes = [
  {
    method: 'post',
    path: '/login',
    isPrivate: false,
    handler: AuthController.authUser,
  },
];

module.exports = routes;
