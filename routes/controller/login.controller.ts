import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

import {
  NAVER_LOGIN_CLIENT_ID,
  NAVER_LOGIN_CLIENT_SECRET,
} from '../../config/env.js';
import { User } from '../../models/User.js';
import { IUser } from '../../types/user.js';
import { getAccessToken, getRefreshToken } from '../../utils/token.js';

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const state = req.body.state;
  const code = req.body.code;
  const grandTokenLink = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_LOGIN_CLIENT_ID}&client_secret=${NAVER_LOGIN_CLIENT_SECRET}&code=${code}&state=${state}`;

  try {
    const response = await axios.get(grandTokenLink);
    const naverAccessToken = response.data.access_token;

    const getUserProfileLink = `https://openapi.naver.com/v1/nid/me`;

    const profile = await axios.get(getUserProfileLink, {
      headers: {
        Authorization: `Bearer ${naverAccessToken}`,
      },
    });

    const id = profile.data.response.id as string;
    const nickname = profile.data.response.nickname;
    const profileImage = profile.data.response.profile_image;

    const user = await User.find({
      id: id,
    }).lean();

    if (!user.length) {
      const newUser = new User<IUser>({
        id: id,
        refreshToken: '',
      });

      await newUser.save();
    }

    const accessToken = getAccessToken(id);
    const refreshToken = await getRefreshToken(id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
    });
    res.json({ accessToken, nickname, profileImage });
  } catch (error) {
    return next(error);
  }
};
