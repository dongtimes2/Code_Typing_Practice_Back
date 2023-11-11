import { Schema, model } from 'mongoose';

import { IPractice } from '../types/practice';

const practiceSchema = new Schema<IPractice>({
  id: String,
  type: String,
  language: String,
  content: String,
});

export const Practice = model<IPractice>('Practice', practiceSchema);
