const express = require('express');

const app = express();
const connectDatabase = require('./database');

connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes');

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
