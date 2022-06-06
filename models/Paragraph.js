const mongoose = require('mongoose');

const paragraphSchema = new mongoose.Schema({
  C: [String],
  JavaScript: [String],
  Python: [String],
});

const Paragraph = mongoose.model('Paragraph', paragraphSchema);

module.exports = { Paragraph };
