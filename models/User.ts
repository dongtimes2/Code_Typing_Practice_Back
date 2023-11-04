import mongoose from 'mongoose';

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
    email: String,
    name: String,
    hiscore: { type: Number, default: 0 },
    soundEffects: { type: Boolean, default: true },
    selectedLanguage: { type: String, default: 'C' },
    numberProblems: { type: Number, default: 10 },
    isColorWeaknessUser: { type: Boolean, default: false },
    languageRecord: [languageRecordSchema],
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
export const LanguageRecord = mongoose.model(
  'LanguageRecord',
  languageRecordSchema,
);
