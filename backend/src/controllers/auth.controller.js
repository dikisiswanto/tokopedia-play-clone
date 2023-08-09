const { authenticate } = require('../services/auth.service');
const { handleClientError, handleResponse } = require('../utilities/responseHandler');

const authUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const accessToken = authenticate({ username, password });

    return handleResponse(res, 200, 'Login success', { accessToken });
  } catch (error) {
    return handleClientError(res, 400, error.message);
  }
};

module.exports = {
  authUser,
};
