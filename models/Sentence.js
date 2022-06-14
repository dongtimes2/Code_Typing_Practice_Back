const mongoose = require('mongoose');

const sentenceSchema = new mongoose.Schema({
  language: String,
  content: String,
});

const Sentence = mongoose.model('Sentence', sentenceSchema);

module.exports = Sentence;
