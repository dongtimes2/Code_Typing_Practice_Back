import 'dotenv/config';

export const MONGO_DB_URL = process.env.MONGO_DB_URL as string;
export const MONGO_DB_DEV_URL = process.env.MONGO_DB_DEV_URL as string;

export const PORT = process.env.PORT as unknown as number;

export const CLIENT_URL = process.env.CLIENT_URL as string;
export const SERVER_URL = process.env.SERVER_URL as string;

export const NAVER_LOGIN_CLIENT_ID = process.env
  .NAVER_LOGIN_CLIENT_ID as string;
export const NAVER_LOGIN_CLIENT_ID_DEV = process.env
  .NAVER_LOGIN_CLIENT_ID_DEV as string;

export const NAVER_LOGIN_CLIENT_SECRET = process.env
  .NAVER_LOGIN_CLIENT_SECRET as string;
export const NAVER_LOGIN_CLIENT_SECRET_DEV = process.env
  .NAVER_LOGIN_CLIENT_SECRET_DEV as string;

export const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY as string;
