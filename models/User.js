const mongoose = require('mongoose');
require('mongoose-type-email');

const languageRecordSchema = new mongoose.Schema(
  {
    language: String,
    maxTypingSpeed: Number,
    accuracy: Number,
  },
  { timestamps: true },
);

const userSchema = new mongoose.Schema(
  {
    email: mongoose.SchemaTypes.Email,
    name: String,
    hiscore: Number,
    soundEffects: Boolean,
    selectedLanguage: String,
    languageRecord: [languageRecordSchema],
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);
const LanguageRecord = mongoose.model('LanguageRecord', languageRecordSchema);

module.exports = { User, LanguageRecord };
