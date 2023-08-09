const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,
  USERNAME: process.env.ADMIN_USERNAME,
  PASSWORD: process.env.ADMIN_PASSWORD,
};
