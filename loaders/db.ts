import createError from 'http-errors';
import mongoose from 'mongoose';

import { MONGO_DB_URL } from '../config/env.js';

mongoose.connection.once('open', () => {
  console.log('MongoDB has been successfully connected!');
});

mongoose.connection.on('error', (error) => {
  console.error(error);
});

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URL);
  } catch (error) {
    throw createError(500, 'DB connection error!');
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    throw createError(500, 'DB disconnection error!');
  }
};

export { connectDB, disconnectDB };
