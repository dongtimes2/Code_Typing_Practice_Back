const mongoose = require('mongoose');

const paragraphSchema = new mongoose.Schema({
  language: String,
  content: String,
});

const Paragraph = mongoose.model('Paragraph', paragraphSchema);

module.exports = Paragraph;
