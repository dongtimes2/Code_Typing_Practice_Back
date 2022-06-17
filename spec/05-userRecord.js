/* eslint-disable */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const admin = require('firebase-admin');
const axios = require('axios');
const { User } = require('../models/User');

describe('유저 레코드 정보 요청 테스트1', function () {
  this.timeout(10000);

  const mongoose = require('mongoose');
  const db = mongoose.connection;
  let customToken = '';
  let idToken = '';

  before(done => {
    (function checkDatabaseConnection() {
      if (db.readyState === 1) {
        return done();
      }

      setTimeout(checkDatabaseConnection, 1000);
    })();
  });

  before(async () => {
    customToken = await admin.auth().createCustomToken('sample');

    const result = await axios({
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.WEB_API_KET}`,
      method: 'post',
      data: {
        token: customToken,
        returnSecureToken: true,
      },
    });

    idToken = result.data.idToken;
  });

  before(async () => {
    try {
      const mockUser = new User({
        _id: 'mockUserId',
        email: 'test@test.com',
      });

      await mockUser.save();
    } catch (err) {
      console.error(err);
    }
  });

  after(async () => {
    await User.findOneAndDelete({ _id: 'mockUserId' });
  });

  it('올바르지 않은 프로그래밍 언어 옵션을 보낸 경우 에러가 발생해야 합니다', done => {
    request(app)
      .get('/users/mockUserId/record/wrongLanguage')
      .set({ authorization: idToken })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include(
          'Invalid Programming Language',
        );
        done();
      });
  });

  it('올바르지 않은 id로 요청이 들어온 경우 에러가 발생해야 합니다', done => {
    request(app)
      .get('/users/wrongUserId/record/C')
      .set({ authorization: idToken })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include('Bad Request');
        done();
      });
  });
});

describe('유저 레코드 정보 요청 테스트2', function () {
  this.timeout(10000);

  const mongoose = require('mongoose');
  const db = mongoose.connection;
  let customToken = '';
  let idToken = '';

  before(done => {
    (function checkDatabaseConnection() {
      if (db.readyState === 1) {
        return done();
      }

      setTimeout(checkDatabaseConnection, 1000);
    })();
  });

  before(async () => {
    customToken = await admin.auth().createCustomToken('sample');

    const result = await axios({
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.WEB_API_KET}`,
      method: 'post',
      data: {
        token: customToken,
        returnSecureToken: true,
      },
    });

    idToken = result.data.idToken;
  });

  before(async () => {
    try {
      const mockUser = new User({
        _id: 'mockUserId',
        email: 'test@test.com',
      });

      await mockUser.save();
    } catch (err) {
      console.error(err);
    }
  });

  after(async () => {
    await User.findOneAndDelete({ _id: 'mockUserId' });
  });

  it('올바르지 않은 프로그래밍 언어 옵션을 보낸 경우 에러가 발생해야 합니다', done => {
    request(app)
      .patch('/users/mockUserId/record/wrongLanguage')
      .set({ authorization: idToken })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include(
          'Invalid Programming Language',
        );
        done();
      });
  });

  it('연습 타입이 올바르지 않을 경우 에러가 발생해야 합니다', done => {
    request(app)
      .patch('/users/mockUserId/record/C')
      .set({ authorization: idToken })
      .send({ type: 'wrongType' })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include(
          'Invalid practice type',
        );
        done();
      });
  });

  it('타속 값이 숫자가 아닌 경우 에러가 발생해야 합니다1', done => {
    request(app)
      .patch('/users/mockUserId/record/C')
      .set({ authorization: idToken })
      .send({ type: 'word', typingSpeed: 'wrongTypingSpeed' })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include(
          'typingSpeed is not a number type',
        );
        done();
      });
  });

  it('타속 값이 숫자가 아닌 경우 에러가 발생해야 합니다2', done => {
    request(app)
      .patch('/users/mockUserId/record/C')
      .set({ authorization: idToken })
      .send({ type: 'word', typingSpeed: true })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include(
          'typingSpeed is not a number type',
        );
        done();
      });
  });

  it('정확도 값이 숫자가 아닌 경우 에러가 발생해야 합니다1', done => {
    request(app)
      .patch('/users/mockUserId/record/C')
      .set({ authorization: idToken })
      .send({ type: 'word', typingSpeed: 123, accuracy: 'wrongAccuracy' })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include(
          'accuracy is not a number type',
        );
        done();
      });
  });

  it('정확도 값이 숫자가 아닌 경우 에러가 발생해야 합니다2', done => {
    request(app)
      .patch('/users/mockUserId/record/C')
      .set({ authorization: idToken })
      .send({ type: 'word', typingSpeed: 123, accuracy: true })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include(
          'accuracy is not a number type',
        );
        done();
      });
  });

  it('스코어 값이 숫자가 아닌 경우 에러가 발생해야 합니다1', done => {
    request(app)
      .patch('/users/mockUserId/record/C')
      .set({ authorization: idToken })
      .send({
        type: 'word',
        typingSpeed: 123,
        accuracy: 123,
        score: 'wrongScore',
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include(
          'score is not a number type',
        );
        done();
      });
  });

  it('스코어 값이 숫자가 아닌 경우 에러가 발생해야 합니다2', done => {
    request(app)
      .patch('/users/mockUserId/record/C')
      .set({ authorization: idToken })
      .send({
        type: 'word',
        typingSpeed: 123,
        accuracy: 123,
        score: true,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include(
          'score is not a number type',
        );
        done();
      });
  });

  it('올바르지 않은 id인 경우 에러가 발생해야 합니다', done => {
    request(app)
      .patch('/users/wrongId/record/C')
      .set({ authorization: idToken })
      .send({
        type: 'word',
        typingSpeed: 123,
        accuracy: 123,
        score: 123,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include('Bad Request');
        done();
      });
  });

  it('모든 정보가 올바르게 입력된 경우 에러가 발생하지 않아야 합니다', done => {
    request(app)
      .patch('/users/mockUserId/record/C')
      .set({ authorization: idToken })
      .send({
        type: 'word',
        typingSpeed: 123,
        accuracy: 123,
        score: 123,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(200);
        expect(res.text).to.include('record_patch_ok');
        done();
      });
  });
});
