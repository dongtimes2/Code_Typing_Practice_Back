import { Schema, model } from 'mongoose';

import { ILanguage } from '../types/language';

const languageSchema = new Schema<ILanguage>({
  id: String,
  name: String,
  description: String,
  imagePath: String,
});

export const Language = model<ILanguage>('Language', languageSchema);
