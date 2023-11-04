import { connectDB } from './db.js';

const loaders = async () => {
  try {
    await connectDB();
  } catch (error) {
    throw error;
  }
};

export default loaders;
