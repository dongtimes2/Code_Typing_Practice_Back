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

describe('문제 데이터 GET 요청 테스트', () => {
  test('param에 language가 올바르지 않다면 에러를 보내야 합니다', (done) => {
    request(app)
      .get('/practice/invalid')
      .expect(400, { message: 'Invalid Programming Language' }, done);
  });

  test('query에 type이 올바르지 않다면 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/languages')
      .send({ name: 'python', description: 'sampleDescription' })
      .expect(201, { message: 'Data is successfully saved' }, () => {
        request(app)
          .get('/practice/python?type=invalid')
          .expect(400, { message: 'Invalid Practice Type' }, done);
      });
  });

  test('query에 quantity가 올바르지 않다면 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/languages')
      .send({ name: 'python', description: 'sampleDescription' })
      .expect(201, { message: 'Data is successfully saved' }, () => {
        request(app)
          .get('/practice/python?type=word&quantity=0')
          .expect(400, { message: 'Invalid Quantity' }, done);
      });
  });

  test('param과 query가 올바르면 에러가 뜨지 않아야 합니다', (done) => {
    request(app)
      .post('/languages')
      .send({ name: 'python', description: 'sampleDescription' })
      .expect(201, { message: 'Data is successfully saved' }, () => {
        request(app)
          .get('/practice/python?type=word&quantity=10')
          .expect(200, done);
      });
  });
});

describe('문제 데이터 POST 요청 테스트', () => {
  test('json 데이터에 content가 없다면 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/languages')
      .send({ name: 'python', description: 'sampleDescription' })
      .expect(201, { message: 'Data is successfully saved' }, () => {
        request(app)
          .post('/practice/python')
          .send({})
          .expect(400, { message: 'Missing Content' }, done);
      });
  });

  test('param에 language가 올바르지 않다면 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/practice/invalid')
      .send({ name: 'python', content: 'sampleDescription' })
      .expect(400, { message: 'Invalid Programming Language' }, done);
  });

  test('json 데이터의 type이 올바르지 않다면 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/languages')
      .send({ name: 'python', description: 'sampleDescription' })
      .expect(201, { message: 'Data is successfully saved' }, () => {
        request(app)
          .post('/practice/python')
          .send({ type: 'wrongType', content: 'sampleContent' })
          .expect(400, { message: 'Invalid Practice Type' }, done);
      });
  });

  test('이미 DB에 존재하는 내용이 있을 경우 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/languages')
      .send({ name: 'python', description: 'sampleDescription' })
      .expect(201, { message: 'Data is successfully saved' }, () => {
        request(app)
          .post('/practice/python')
          .send({ type: 'word', content: 'sampleContent' })
          .expect(201, { message: 'Data is successfully saved' }, () => {
            request(app)
              .post('/practice/python')
              .send({ type: 'word', content: 'sampleContent' })
              .expect(400, { message: 'Already exists' }, done);
          });
      });
  });

  test('param과 json 데이터가 올바르면 에러가 뜨지 않아야 합니다', (done) => {
    request(app)
      .post('/languages')
      .send({ name: 'python', description: 'sampleDescription' })
      .expect(201, { message: 'Data is successfully saved' }, () => {
        request(app)
          .post('/practice/python')
          .send({ type: 'word', content: 'sampleContent' })
          .expect(201, done);
      });
  });
});
