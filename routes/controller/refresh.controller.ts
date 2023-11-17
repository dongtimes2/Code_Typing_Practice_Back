import { NextFunction, Request, Response } from 'express';

import {
  decodeAccessToken,
  getAccessToken,
  verifyRefreshToken,
} from '../../utils/token.js';

export const postRefresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next({ status: 401, message: 'Missing Access Token' });
  }

  const accessToken = authorization.split(' ')[1];
  const { refreshToken } = req.cookies;
  const id = decodeAccessToken(accessToken);

  try {
    const newAccessToken = getAccessToken(id);
    await verifyRefreshToken(id, refreshToken);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'expired') {
        res.clearCookie('refreshToken');
        return next({ status: 401, message: 'Refresh Token Expired' });
      } else {
        return next({ status: 401, message: 'Invalid Refresh Token' });
      }
    }
  }
};
