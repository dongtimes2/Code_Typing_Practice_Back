const request = require('supertest');

const app = require('../app');
const {
  connectTestDB,
  disconnectTestDB,
} = require('../utils/test_utils/testdb');

beforeEach(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await disconnectTestDB();
});

describe('로그인 요청 테스트', () => {
  test('uid 정보가 없다면 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/auth/login')
      .expect(400, { message: 'Missing uid' }, done);
  });

  test('uid 정보가 있고 email 정보가 없다면 에러를 보내야 합니다', (done) => {
    request(app)
      .post('/auth/login')
      .send({ uid: 'sampleUid' })
      .expect(400, { message: 'Invalid Email Type' }, done);
  });

  test('uid 정보와 email 정보가 모두 있다면 에러가 뜨지 않아야 합니다', (done) => {
    request(app)
      .post('/auth/login')
      .send({ uid: 'sampleUid', email: 'sample@sample.com' })
      .expect(200, '"login_ok"', done);
  });
});
