import { NextFunction, Request, Response } from 'express';

import { User } from '../../models/User.js';
import { emailTypeValidationCheck } from '../../utils/emailTypeValidationCheck.js';

export const post = async (req: Request, res: Response, next: NextFunction) => {
  let result: string | null = '';

  try {
    result = await User.findById(req.body.uid);
  } catch (err) {
    return next(err);
  }

  if (!result) {
    const { uid, email, displayName } = req.body;

    if (!uid) {
      return next({ status: 400, message: 'Missing uid' });
    }

    if (!emailTypeValidationCheck(email)) {
      return next({ status: 400, message: 'Invalid Email Type' });
    }

    try {
      const user = new User({
        _id: uid,
        email,
        name: displayName,
      });

      await user.save();
    } catch (err) {
      return next(err);
    }
  }

  res.json('login_ok');
};
