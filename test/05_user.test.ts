import request from 'supertest';

import app from '../app.js';
import {
  connectTestDB,
  disconnectTestDB,
  resetTestDB,
} from '../utils/test_utils/testdb.js';
import { getAccessToken, getRefreshToken } from '../utils/token.js';
import { User } from '../models/User.js';

describe('유저 정보 요청 테스트', () => {
  beforeAll(async () => {
    await connectTestDB();
    await new User({ id: 'sampleId' }).save();
    await getRefreshToken('sampleId');
  });

  afterAll(async () => {
    await resetTestDB();
    await disconnectTestDB();
  });

  test('유저 정보를 요청했을 때, 유저 정보가 반환되어야 합니다', (done) => {
    request(app)
      .get('/users')
      .set('authorization', `Bearer ${getAccessToken('sampleId')}`)
      .expect(200, done);
  });
});

describe('유저 정보 갱신 테스트', () => {
  beforeEach(async () => {
    await connectTestDB();
    await new User({ id: 'sampleId' }).save();
    await getRefreshToken('sampleId');
  });

  afterEach(async () => {
    await resetTestDB();
    await disconnectTestDB();
  });

  test('유저의 sound 설정을 갱신했을 때, 에러를 보내지 않아야 합니다', (done) => {
    request(app)
      .patch('/users')
      .set('authorization', `Bearer ${getAccessToken('sampleId')}`)
      .send({ sound: true })
      .expect(204, done);
  });

  test('유저의 color 설정을 갱신했을 때, 에러를 보내지 않아야 합니다', (done) => {
    request(app)
      .patch('/users')
      .set('authorization', `Bearer ${getAccessToken('sampleId')}`)
      .send({ isColorWeakness: true })
      .expect(204, done);
  });

  test('유저의 문제 갯수 설정을 갱신했을 때, 에러를 보내지 않아야 합니다', (done) => {
    request(app)
      .patch('/users')
      .set('authorization', `Bearer ${getAccessToken('sampleId')}`)
      .send({ practiceNumber: 10 })
      .expect(204, done);
  });
});
