import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema({
  language: String,
  content: String,
});

export const Word = mongoose.model('Word', wordSchema);
