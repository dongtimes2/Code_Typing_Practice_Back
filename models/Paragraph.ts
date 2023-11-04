import mongoose from 'mongoose';

const paragraphSchema = new mongoose.Schema({
  language: String,
  content: String,
});

export const Paragraph = mongoose.model('Paragraph', paragraphSchema);
