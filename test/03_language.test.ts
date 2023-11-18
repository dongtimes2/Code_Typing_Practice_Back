import request from 'supertest';

import app from '../app.js';
import {
  connectTestDB,
  disconnectTestDB,
  resetTestDB,
} from '../utils/test_utils/testdb.js';

beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await resetTestDB();
});

afterAll(async () => {
  await disconnectTestDB();
});

describe('언어 정보 GET 요청 테스트', () => {
  test('언어 정보들을 요청한 경우 에러가 뜨지 않아야 합니다', (done) => {
    request(app).get('/languages').expect(200, done);
  });
});

describe('언어 정보 POST 요청 테스트', () => {
  test('json 데이터에 name이 없다면 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/languages')
      .send({})
      .expect(400, { message: 'Missing Name' }, done);
  });

  test('json 데이터에 description이 없다면 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/languages')
      .send({ name: 'sampleName' })
      .expect(400, { message: 'Missing Description' }, done);
  });

  test('json 데이터가 올바르다면 에러가 뜨지 않아야 합니다', (done) => {
    request(app)
      .post('/languages')
      .send({ name: 'sampleName', description: 'sampleDescription' })
      .expect(201, { message: 'Data is successfully saved' }, done);
  });

  test('json 데이터의 name이 이미 DB에 존재한다면 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/languages')
      .send({ name: 'sampleName', description: 'sampleDescription' })
      .expect(201, { message: 'Data is successfully saved' }, () => {
        request(app)
          .post('/languages')
          .send({ name: 'sampleName', description: 'sampleDescription' })
          .expect(400, { message: 'Already exists' }, done);
      });
  });
});
