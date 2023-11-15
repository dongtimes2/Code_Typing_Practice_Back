import { Schema, model } from 'mongoose';

import { IUser } from '../types/user';

const userSchema = new Schema<IUser>({
  id: String,
  refreshToken: String,
});

export const User = model<IUser>('User', userSchema);
