const mongoose = require('mongoose');

const sentenceSchema = new mongoose.Schema({
  cSentence: [String],
  jsSentence: [String],
  pythonSentence: [String],
});

const Sentence = mongoose.model('Sentence', sentenceSchema);

module.exports = { Sentence };
