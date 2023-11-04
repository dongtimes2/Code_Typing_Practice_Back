const request = require('supertest');

const app = require('../app');

describe('기본 연결 테스트', () => {
  test('서버와 연결되어야 합니다', (done) => {
    request(app).get('/').expect(200, '"server_status_ok"', done);
  });
});
