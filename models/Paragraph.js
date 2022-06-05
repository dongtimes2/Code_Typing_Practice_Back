const mongoose = require('mongoose');

const paragraphSchema = new mongoose.Schema({
  cParagraph: [String],
  jsParagraph: [String],
  pythonParagraph: [String],
});

const Paragraph = mongoose.model('Paragraph', paragraphSchema);

module.exports = { Paragraph };
