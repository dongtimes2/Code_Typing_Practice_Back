const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  cLanguage: [String],
  jsLanguage: [String],
  pythonLanguage: [String],
});

const Word = mongoose.model('Word', wordSchema);

module.exports = { Word };
