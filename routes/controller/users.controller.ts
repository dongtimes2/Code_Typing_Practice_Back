import { NextFunction, Request, Response } from 'express';

import { User } from '../../models/User.js';
import { IUserSettings } from '../../types/user.js';

export const patchUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.userId;
  const data: IUserSettings = req.body;

  if (typeof data.sound === 'boolean') {
    try {
      await User.findOneAndUpdate({ id }, { sound: data.sound });
    } catch (error) {
      return next(error);
    }
  }

  if (typeof data.isColorWeakness === 'boolean') {
    try {
      await User.findOneAndUpdate(
        { id },
        { isColorWeakness: data.isColorWeakness },
      );
    } catch (error) {
      return next(error);
    }
  }

  if (typeof data.practiceNumber === 'number') {
    try {
      await User.findOneAndUpdate(
        { id },
        { practiceNumber: data.practiceNumber },
      );
    } catch (error) {
      return next(error);
    }
  }

  res.status(204).json({ message: 'patch_ok' });
};
