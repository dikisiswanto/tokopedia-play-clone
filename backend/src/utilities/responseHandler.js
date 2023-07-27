const handleServerError = (res, error) =>
  res.status(500).json({
    success: false,
    code: 500,
    error: `Server Error: ${error.message}`,
  });

const handleClientError = (res, code, error) =>
  res.status(code).json({
    success: false,
    code,
    error,
  });

const handleResponse = (res, code, message, data) =>
  res.status(code).json({
    success: code >= 200 && code < 300,
    code,
    message,
    data,
  });

module.exports = {
  handleServerError,
  handleClientError,
  handleResponse,
};
