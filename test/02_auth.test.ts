import request from 'supertest';

import app from '../app.js';
import {
  connectTestDB,
  disconnectTestDB,
  resetTestDB,
} from '../utils/test_utils/testdb.js';
import {
  getAccessToken,
  getExpiredAccessToken,
  getExpiredRefreshToken,
  getRefreshToken,
} from '../utils/token.js';
import { User } from '../models/User.js';

describe('네이버 로그인 요청 테스트', () => {
  test('네이버 소셜 로그인 시 state 정보가 없다면 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/auth/login')
      .expect(400, { message: 'Invalid State' }, done);
  });

  test('네이버 소셜 로그인 시 code 정보가 없다면 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/auth/login')
      .send({ state: 'sampleState' })
      .expect(400, { message: 'Invalid Code' }, done);
  });
});

describe('토큰 갱신 요청 테스트1', () => {
  test('accessToken이 없다면 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/auth/refresh')
      .expect(401, { message: 'Missing Access Token' }, done);
  });

  test('올바르지 않은 형태로 accessToken이 전달되었을 경우 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/auth/refresh')
      .set('authorization', 'invalid token form')
      .expect(401, { message: 'Missing Access Token' }, done);
  });
});

describe('토큰 갱신 요청 테스트2', () => {
  beforeAll(async () => {
    await connectTestDB();
    await new User({ id: 'sampleId' }).save();
    await getRefreshToken('sampleId');
  });

  afterAll(async () => {
    await resetTestDB();
    await disconnectTestDB();
  });

  test('refreshToken이 전달되지 않았을 경우 에러를 보내야 합니다', (done) => {
    const sampleToken = getAccessToken('sampleId');
    request(app)
      .post('/auth/refresh')
      .set('authorization', `Bearer ${sampleToken}`)
      .expect(401, { message: 'Invalid Refresh Token' }, done);
  });

  test('정상적인 refreshToken이 전달되었을 경우 accessToken을 보내야 합니다', async () => {
    const sampleAccessToken = getAccessToken('sampleId');
    const sampleUser = await User.findOne({ id: 'sampleId' });
    const sampleRefreshToken = sampleUser?.refreshToken;

    const response = await request(app)
      .post('/auth/refresh')
      .set('authorization', `Bearer ${sampleAccessToken}`)
      .set('Cookie', `refreshToken=${sampleRefreshToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ accessToken: `${sampleAccessToken}` });
  });
});

describe('토큰 갱신 요청 테스트3', () => {
  beforeAll(async () => {
    await connectTestDB();
    await new User({ id: 'sampleId' }).save();
    await getExpiredRefreshToken('sampleId');
  });

  afterAll(async () => {
    await resetTestDB();
    await disconnectTestDB();
  });

  test('refreshToken이 만료되었을 경우 에러를 보내야 합니다', async () => {
    const sampleAccessToken = getAccessToken('sampleId');
    const sampleUser = await User.findOne({ id: 'sampleId' });
    const sampleRefreshToken = sampleUser?.refreshToken;

    const response = await request(app)
      .post('/auth/refresh')
      .set('authorization', `Bearer ${sampleAccessToken}`)
      .set('Cookie', `refreshToken=${sampleRefreshToken}`);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Refresh Token Expired' });
  });
});

describe('로그아웃 요청 테스트1', () => {
  test('accessToken이 없다면 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/auth/logout')
      .expect(401, { message: 'Missing Access Token' }, done);
  });

  test('올바르지 않은 형태로 accessToken이 전달되었을 경우 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/auth/logout')
      .set('authorization', 'invalid token form')
      .expect(401, { message: 'Missing Access Token' }, done);
  });

  test('accessToken이 올바르지 않을 경우 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/auth/logout')
      .set('authorization', `Bearer invalidToken`)
      .expect(401, { message: 'Invalid Token' }, done);
  });

  test('accessToken이 만료되었을 경우 에러를 보내야 합니다', async () => {
    const sampleAccessToken = getExpiredAccessToken('sampleId');
    const response = await request(app)
      .post('/auth/logout')
      .set('authorization', `Bearer ${sampleAccessToken}`);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Token Expired' });
  });
});

describe('로그아웃 요청 테스트2', () => {
  beforeAll(async () => {
    await connectTestDB();
    await new User({ id: 'sampleId' }).save();
    await getRefreshToken('sampleId');
  });

  afterAll(async () => {
    await resetTestDB();
    await disconnectTestDB();
  });

  test('로그아웃 요청이 성공할 경우 에러가 뜨지 않아야 합니다', async () => {
    const sampleAccessToken = getAccessToken('sampleId');
    const response = await request(app)
      .post('/auth/logout')
      .set('authorization', `Bearer ${sampleAccessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'logout_ok' });
  });
});
