require('dotenv').config();

const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const { errorHandler } = require('./middlewares/errorHandler');
const { loggerMiddleware } = require('./middlewares/logger');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(loggerMiddleware);

app.use('/api', apiRoutes);
app.use(errorHandler);

module.exports = app;