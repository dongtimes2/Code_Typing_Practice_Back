require('dotenv').config();
require('./config/firebaseConfig');

const cors = require('cors');
const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');

const router = require('./routes/router');

const app = express();

app.set('port', process.env.PORT || 8000);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(router);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'internal error' });
  }
});

module.exports = app;
