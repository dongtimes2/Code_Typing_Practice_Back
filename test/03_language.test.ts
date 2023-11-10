import request from 'supertest';

import app from '../app';
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

describe('언어 정보 요청 테스트', () => {
  test('언어 정보들을 요청한 경우 에러가 뜨지 않아야 합니다', (done) => {
    request(app).get('/languages').expect(200, done);
  });

  test('post 요청을 보낼 때 json 데이터에 name이 없다면 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/languages')
      .send({})
      .expect(400, { message: 'Missing Name' }, done);
  });

  test('post 요청을 보낼 때 json 데이터에 description이 없다면 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/languages')
      .send({ name: 'sampleName' })
      .expect(400, { message: 'Missing Description' }, done);
  });

  test('post 요청을 보낼 때 json 데이터가 올바르다면 에러가 뜨지 않아야 합니다', (done) => {
    request(app)
      .post('/languages')
      .send({ name: 'sampleName', description: 'sampleDescription' })
      .expect(201, { message: 'Data is successfully saved' }, done);
  });

  test('post 요청을 보낼 때 json 데이터에 name이 이미 존재한다면 에러를 보내야 합니다', (done) => {
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

describe('문제 데이터 요청 테스트', () => {
  test('올바르지 않은 프로그래밍 언어를 요청한 경우 에러를 보내야 합니다', (done) => {
    request(app)
      .get('/languages/wrongLanguage')
      .expect(400, { message: 'Invalid Programming Language' }, done);
  });

  test('올바르지 않은 연습타입을 요청한 경우 에러를 보내야 합니다', (done) => {
    request(app)
      .get('/languages/C')
      .query({ type: 'wrongPracticeType' })
      .expect(400, { message: 'Invalid practice type' }, done);
  });

  test('올바른 프로그래밍 언어와 올바른 연습타입을 요쳥한 경우 에러가 뜨지 않아야 합니다', (done) => {
    request(app).get('/languages/C').query({ type: 'word' }).expect(200, done);
  });
});
