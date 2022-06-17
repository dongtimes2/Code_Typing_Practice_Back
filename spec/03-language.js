/* eslint-disable */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('문제 요청 테스트', function () {
  this.timeout(10000);

  const mongoose = require('mongoose');
  const db = mongoose.connection;

  before(done => {
    (function checkDatabaseConnection() {
      if (db.readyState === 1) {
        return done();
      }

      setTimeout(checkDatabaseConnection, 1000);
    })();
  });

  it('올바르지 않은 프로그래밍 언어를 요청한 경우 에러가 발생해야 합니다', done => {
    request(app)
      .get('/languages/wrongLanguage')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include(
          'Invalid Programming Language',
        );
        done();
      });
  });

  it('올바르지 않은 연습 타입을 요청한 경우 에러가 발생해야 합니다', done => {
    request(app)
      .get('/languages/C')
      .query({ type: 'wrongPracticeType' })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include(
          'Invalid practice type',
        );
        done();
      });
  });

  it('올바른 프로그래밍 언어와 올바른 연습 타입을 요청한 경우 에러가 없어야 합니다', done => {
    request(app)
      .get('/languages/C')
      .query({ type: 'word' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(200);
        done();
      });
  });
});
