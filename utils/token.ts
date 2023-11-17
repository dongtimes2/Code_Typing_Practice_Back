import jwt, { JwtPayload } from 'jsonwebtoken';

import { TOKEN_SECRET_KEY } from '../config/env.js';
import { User } from '../models/User.js';

interface IDecodedToken extends JwtPayload {
  id: string;
}

// 테스트 전용 함수
export const getExpiredAccessToken = (id: string) => {
  const accessToken = jwt.sign({ id }, TOKEN_SECRET_KEY, {
    expiresIn: '0.1s',
  });

  return accessToken;
};

export const getAccessToken = (id: string) => {
  const accessToken = jwt.sign({ id }, TOKEN_SECRET_KEY, {
    expiresIn: '3600s',
  });

  return accessToken;
};

export const verifyAccessToken = (accessToken: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, TOKEN_SECRET_KEY, (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          reject(Error('expired'));
        } else {
          reject(Error('invalid'));
        }
      } else {
        resolve((decoded as IDecodedToken).id);
      }
    });
  });
};

export const decodeAccessToken = (accessToken: string) => {
  const { id } = jwt.decode(accessToken) as IDecodedToken;

  return id;
};

// 테스트 전용 함수
export const getExpiredRefreshToken = async (id: string) => {
  const refreshToken = jwt.sign({}, TOKEN_SECRET_KEY, {
    expiresIn: '0.1s',
  });

  await User.findOneAndUpdate({ id }, { refreshToken });
  return refreshToken;
};

export const getRefreshToken = async (id: string) => {
  const refreshToken = jwt.sign({}, TOKEN_SECRET_KEY, {
    expiresIn: '14d',
  });

  await User.findOneAndUpdate({ id }, { refreshToken });
  return refreshToken;
};

export const verifyRefreshToken = async (id: string, refreshToken: string) => {
  jwt.verify(refreshToken, TOKEN_SECRET_KEY, (error) => {
    if (error) {
      if (error.name === 'TokenExpiredError') {
        throw Error('expired');
      } else {
        throw Error('invalid');
      }
    }
  });

  try {
    const user = await User.findOne({ id }).lean();

    if (user?.refreshToken == refreshToken) {
      return;
    }
  } catch (error) {
    throw Error();
  }
};
