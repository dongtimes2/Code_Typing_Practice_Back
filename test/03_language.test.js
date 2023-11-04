const request = require('supertest');

const app = require('../app');
const {
  connectTestDB,
  disconnectTestDB,
} = require('../utils/test_utils/testdb');

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await disconnectTestDB();
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
