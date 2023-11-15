import { NextFunction, Request, Response } from 'express';

import { User } from '../../models/User.js';

export const postLogout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.userId;

  try {
    await User.findOneAndUpdate({ id }, { refreshToken: '' });
  } catch (error) {
    return next(error);
  } finally {
    res.clearCookie('refreshToken');
    res.json({ message: 'logout_ok' });
  }
};
