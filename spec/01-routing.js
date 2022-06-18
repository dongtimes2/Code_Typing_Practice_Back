/* eslint-disable */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('기본적인 접속 테스트', function () {
  it('서버 접속을 확인합니다', done => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eq(200);
        expect(res.text).to.include('server_status_ok');
        done();
      });
  });
});
