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

describe('기록 요청 테스트', () => {
  beforeAll(async () => {
    await connectTestDB();
    await new User({ id: 'sampleId' }).save();
    await getRefreshToken('sampleId');
  });

  afterAll(async () => {
    await resetTestDB();
    await disconnectTestDB();
  });

  test('올바르지 않은 기록 타입이 전달되었을 경우 에러를 보내야 합니다', (done) => {
    request(app)
      .get('/records?type=invalid')
      .set('authorization', `Bearer ${getAccessToken('sampleId')}`)
      .expect(400, { message: 'Invalid Record Type' }, done);
  });

  test('stat 기록 타입이 전달되었을 경우, 에러를 보내지 않아야 합니다', (done) => {
    request(app)
      .get('/records?type=stat')
      .set('authorization', `Bearer ${getAccessToken('sampleId')}`)
      .expect(200, done);
  });

  test('recent 기록 타입이 전달되었을 경우, 에러를 보내지 않아야 합니다', (done) => {
    request(app)
      .get('/records?type=recent')
      .set('authorization', `Bearer ${getAccessToken('sampleId')}`)
      .expect(200, done);
  });
});

describe('기록 등록 테스트', () => {
  beforeAll(async () => {
    await connectTestDB();
    await new User({ id: 'sampleId' }).save();
    await getRefreshToken('sampleId');
  });

  afterAll(async () => {
    await resetTestDB();
    await disconnectTestDB();
  });

  test('기록 등록 시 연습 type이 올바르지 않은 경우, 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/records')
      .set('authorization', `Bearer ${getAccessToken('sampleId')}`)
      .send({ type: 'invalidType' })
      .expect(400, { message: 'Invalid Practice Type' }, done);
  });

  test('기록 등록 시 language가 올바르지 않은 경우, 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/languages')
      .send({ name: 'python', description: 'sampleDescription' })
      .expect(201, { message: 'Data is successfully saved' }, () => {
        request(app)
          .post('/records')
          .set('authorization', `Bearer ${getAccessToken('sampleId')}`)
          .send({ type: 'word', language: 'invalidLanguage' })
          .expect(400, { message: 'Invalid Programming Language' }, done);
      });
  });

  test('기록 등록 시 모든 데이터가 올바를 경우, 에러를 보내지 않아야 합니다', (done) => {
    request(app)
      .post('/languages')
      .send({ name: 'python', description: 'sampleDescription' })
      .expect(201, { message: 'Data is successfully saved' }, () => {
        request(app)
          .post('/records')
          .set('authorization', `Bearer ${getAccessToken('sampleId')}`)
          .send({ type: 'word', language: 'python' })
          .expect(201, { message: 'Data is successfully saved' }, done);
      });
  });
});
