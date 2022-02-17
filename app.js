const express = require('express');
const createError = require('http-errors');
const dataFetchingTask = require('./lib/DataFetchingTask');
const cors = require('cors');
const cron = require('node-cron')

require('dotenv').config();
const connectDB = require('./lib/MongoDB');

const app = express();

/**
 * ROUTERS
 */
const apiRouter = require('./routes/api');
const { exit } = require('process');


/**
 * MIDDLEWARE
 */
const corsOptions = {};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

/**
 * ROUTES
 */
app.get('/', (req, res) => {
  res.json('Shindiri nodejs app').end();
});

app.use('/api/v1', apiRouter);

// Catch 404 error and forward it to error handler
app.use((req, res, next) => next(createError(404)));
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err);
  res.end();
});

/**
 * Cron Jobs Schedules
 */
try {
  cron.schedule('0 0 * * * *', dataFetchingTask)
} catch(error) {
  console.log(error)
  process.exit(1);
}



module.exports = app