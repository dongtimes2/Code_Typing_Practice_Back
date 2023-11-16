import { Schema, model } from 'mongoose';

import { IRecord } from '../types/record';

const recordSchema = new Schema<IRecord>(
  {
    id: String,
    userId: String,
    type: String,
    language: String,
    accuracy: Number,
    typingSpeed: Number,
  },
  { timestamps: true },
);

export const Record = model<IRecord>('Record', recordSchema);
