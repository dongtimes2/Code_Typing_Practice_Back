import mongoose from 'mongoose';

const sentenceSchema = new mongoose.Schema({
  language: String,
  content: String,
});

export const Sentence = mongoose.model('Sentence', sentenceSchema);
