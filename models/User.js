const mongoose = require('mongoose');
require('mongoose-type-email');

const languageRecordSchema = new mongoose.Schema({
  language: String,
  typingSpeed: Number,
  accuracy: Number,
  time: String,
  type: String,
});

const userSchema = new mongoose.Schema(
  {
    _id: String,
    email: mongoose.SchemaTypes.Email,
    name: String,
    hiscore: { type: Number, default: 0 },
    soundEffects: { type: Boolean, default: true },
    selectedLanguage: { type: String, default: 'C' },
    numberProblems: { type: Number, default: 10 },
    languageRecord: [languageRecordSchema],
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);
const LanguageRecord = mongoose.model('LanguageRecord', languageRecordSchema);

module.exports = { User, LanguageRecord };
