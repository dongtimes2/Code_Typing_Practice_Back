const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  C: [String],
  JavaScript: [String],
  Python: [String],
});

const Word = mongoose.model('Word', wordSchema);

module.exports = { Word };
