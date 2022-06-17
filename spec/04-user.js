/* eslint-disable */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const admin = require('firebase-admin');
const axios = require('axios');
const { User } = require('../models/User');

describe('유저정보 요청 테스트1', function () {
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

  it('인가받지 않은 사용자가 요청을 보낸 경우 에러가 발생해야 합니다', done => {
    request(app)
      .get('/users/tempUserId')
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(401);
        expect(JSON.parse(res.text).status).to.eql(401);
        expect(JSON.parse(res.text).message).to.include('Unauthorized');

        done();
      });
  });

  it('올바르지 않은 토큰을 사용한 경우 에러가 발생해야 합니다', done => {
    request(app)
      .get('/users/tempUserId')
      .set({ authorization: 'wrongToken' })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include('Invalid token');

        done();
      });
  });

  it('인가 받은 사용자인 경우 에러가 발생하면 안됩니다', done => {
    request(app)
      .get('/users/tempUserId')
      .set({ authorization: idToken })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(200);
        done();
      });
  });
});

describe('유저정보 요청 테스트2', function () {
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

  it('올바르지 않은 프로그래밍 언어 옵션을 보낸 경우 에러가 발생해야 합니다', done => {
    request(app)
      .patch('/users/tempUserId')
      .set({ authorization: idToken })
      .send({ selectedLanguage: 'wrongLanguage' })
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

  it('효과음 설정 여부 옵션이 boolean 타입이 아닐 경우 에러가 발생해야 합니다1', done => {
    request(app)
      .patch('/users/tempUserId')
      .set({ authorization: idToken })
      .send({ selectedLanguage: 'C', soundEffects: 'wrongSoundOption' })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include(
          'soundEffects is not a boolean type',
        );
        done();
      });
  });

  it('효과음 설정 여부 옵션이 boolean 타입이 아닐 경우 에러가 발생해야 합니다2', done => {
    request(app)
      .patch('/users/tempUserId')
      .set({ authorization: idToken })
      .send({ selectedLanguage: 'C', soundEffects: 123 })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include(
          'soundEffects is not a boolean type',
        );
        done();
      });
  });

  it('문제 개수 설정 옵션이 숫자 타입이 아닌 경우 에러가 발생해야 합니다1', done => {
    request(app)
      .patch('/users/tempUserId')
      .set({ authorization: idToken })
      .send({
        selectedLanguage: 'C',
        soundEffects: true,
        numberProblems: 'wrongNumberOption',
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include(
          'numberProblems is not a number type',
        );
        done();
      });
  });

  it('문제 개수 설정 옵션이 숫자 타입이 아닌 경우 에러가 발생해야 합니다2', done => {
    request(app)
      .patch('/users/tempUserId')
      .set({ authorization: idToken })
      .send({
        selectedLanguage: 'C',
        soundEffects: true,
        numberProblems: true,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include(
          'numberProblems is not a number type',
        );
        done();
      });
  });

  it('색약 여부 설정 옵션이 boolean 타입이 아닐 경우 에러가 발생해야 합니다1', done => {
    request(app)
      .patch('/users/tempUserId')
      .set({ authorization: idToken })
      .send({
        selectedLanguage: 'C',
        soundEffects: true,
        numberProblems: 10,
        isColorWeaknessUser: 'wrongColorWeaknessUserOption',
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include(
          'isColorWeaknessUser is not a boolean type',
        );
        done();
      });
  });

  it('색약 여부 설정 옵션이 boolean 타입이 아닐 경우 에러가 발생해야 합니다2', done => {
    request(app)
      .patch('/users/tempUserId')
      .set({ authorization: idToken })
      .send({
        selectedLanguage: 'C',
        soundEffects: true,
        numberProblems: 10,
        isColorWeaknessUser: 10,
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(400);
        expect(JSON.parse(res.text).status).to.eql(400);
        expect(JSON.parse(res.text).message).to.include(
          'isColorWeaknessUser is not a boolean type',
        );
        done();
      });
  });

  it('올바르지 않은 id로 요청이 들어온 경우 에러가 발생해야 합니다', done => {
    request(app)
      .patch('/users/tempUserId')
      .set({ authorization: idToken })
      .send({
        selectedLanguage: 'C',
        soundEffects: true,
        numberProblems: 10,
        isColorWeaknessUser: false,
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
});

describe('유저정보 요청 테스트3', function () {
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

  it('모든 정보가 올바르게 입력된 경우 에러가 없어야 합니다', done => {
    request(app)
      .patch('/users/mockUserId')
      .set({ authorization: idToken })
      .send({
        selectedLanguage: 'C',
        soundEffects: true,
        numberProblems: 10,
        isColorWeaknessUser: false,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.eql(200);
        expect(res.text).to.include('users_ok');
        done();
      });
  });
});
