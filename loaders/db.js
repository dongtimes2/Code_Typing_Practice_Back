const createError = require('http-errors');
const mongoose = require('mongoose');

mongoose.connection.once('open', () => {
  console.log('MongoDB has been successfully connected!');
});

mongoose.connection.on('error', (error) => {
  console.error(error);
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
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

module.exports = {
  connectDB,
  disconnectDB,
};
