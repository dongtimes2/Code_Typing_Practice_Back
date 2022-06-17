/* eslint-disable */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const { User } = require('../models/User');

describe('로그인 요청 테스트1 ', function () {
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

  it('uid 정보가 없다면 에러를 보내야 합니다', done => {
    request(app)
      .post('/auth/login')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include('Missing uid');
        done();
      });
  });
});

describe('로그인 요청 테스트2', function () {
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

  afterEach(async () => {
    await User.findOneAndDelete({ _id: 'sampleUid' });
  });

  it('uid 정보와 email 정보가 모두 있다면 에러가 뜨지 않아야 합니다', done => {
    request(app)
      .post('/auth/login')
      .send({ uid: 'sampleUid', email: 'sample@sample.com' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(200);
        expect(res.text).to.include('login_ok');
        done();
      });
  });

  it('uid 정보가 있고 email 정보가 없다면 에러를 보내야 합니다', done => {
    request(app)
      .post('/auth/login')
      .send({ uid: 'sampleUid' })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include('Invalid Email Type');
        done();
      });
  });
});
