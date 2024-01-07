import request from 'supertest';

import app from '../app.js';

describe('기본 연결 테스트', () => {
  test('서버와 연결되어야 합니다', (done) => {
    request(app).get('/').expect(200, '"server_status_ok"', done);
  });

  test('잘못된 경로로 요청하면 404를 응답해야 합니다', (done) => {
    request(app).get('/wrong').expect(404, done);
  });
});
