require('dotenv').config();
require('./config/firebaseConfig');

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const router = require('./routes/router');

const { connectDB } = require('./config/dbConfig');

const app = express();
connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  if (res.statusCode !== 500) {
    res.json({ message: err.message });
  } else {
    res.json({});
  }
});

module.exports = app;
