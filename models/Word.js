const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  language: String,
  content: String,
});

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
