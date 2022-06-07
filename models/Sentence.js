const mongoose = require('mongoose');

const sentenceSchema = new mongoose.Schema({
  C: [String],
  JavaScript: [String],
  Python: [String],
});

const Sentence = mongoose.model('Sentence', sentenceSchema);

module.exports = { Sentence };
