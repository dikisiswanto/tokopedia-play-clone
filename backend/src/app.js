const express = require('express');
const cors = require('cors');
const http = require('http');
const morgan = require('morgan');
const helmet = require('helmet');
const { setupSocket } = require('./services/websocket.service');

const app = express();
const server = http.createServer(app);
const connectDatabase = require('./database');

connectDatabase();

app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes');
const { handleClientError } = require('./utilities/responseHandler');

setupSocket(server);

app.use('/api', routes);
app.use((req, res) => handleClientError(res, 404, 'Route not found'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
