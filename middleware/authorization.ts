import { NextFunction, Request, Response } from 'express';
import admin from 'firebase-admin';

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers?.authorization as string;

  if (String(token) !== 'undefined') {
    try {
      await admin.auth().verifyIdToken(token);
      return next();
    } catch (error) {
      return next({ status: 400, message: 'Invalid token' });
    }
  } else {
    return next({ status: 401, message: 'Unauthorized' });
  }
};

export default authorization;
