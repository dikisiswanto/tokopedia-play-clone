const express = require('express');
const session = require('express-session');
const csurf = require('csurf');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { SESSION_SECRET_KEY } = require('./config');

const app = express();
const connectDatabase = require('./database');

connectDatabase();

app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
app.use(
  session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);
app.use(cookieParser());

app.use(csurf({ cookie: true, ignoreMethods: ['GET', 'DELETE'] }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes');
const { handleClientError } = require('./utilities/responseHandler');

app.use('/api', routes);
app.use((req, res) => handleClientError(res, 404, 'Route not found'));

app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return handleClientError(res, 403, 'CSRF Protection Error: Invalid CSRF token');
  }

  next(err);

  return null;
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
