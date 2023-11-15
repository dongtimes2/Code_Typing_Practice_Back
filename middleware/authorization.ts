import { NextFunction, Request, Response } from 'express';

import { verifyAccessToken } from '../utils/token.js';

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next({ status: 401, message: 'Missing Access Token' });
  }

  const accessToken = authorization.split(' ')[1];
  try {
    const id = await verifyAccessToken(accessToken);
    req.userId = id;
    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'expired') {
        return next({ status: 401, message: 'Token Expired' });
      } else {
        return next({ status: 401, message: 'Invalid Token' });
      }
    }
  }
};

export default authorization;
