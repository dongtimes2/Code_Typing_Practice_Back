const firebase = require('firebase-admin');

const decodeToken = async (req, res, next) => {
  const token = req.headers?.authorization;

  if (String(token) !== 'undefined') {
    try {
      const result = await firebase.auth().verifyIdToken(token);

      req.user = result;
    } catch (err) {
      next(err);
    }
  }

  next();
};

module.exports = decodeToken;
