const { connectDB } = require('./db');

const loaders = async () => {
  try {
    await connectDB();
  } catch (error) {
    throw error;
  }
};

module.exports = loaders;
