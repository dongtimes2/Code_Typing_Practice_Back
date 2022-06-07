const firebase = require('firebase-admin');

const authorization = async (req, res, next) => {
  const token = req.headers?.authorization;

  if (String(token) !== 'undefined') {
    try {
      const result = await firebase.auth().verifyIdToken(token);

      req.user = result;
      return next();
    } catch (err) {
      if (err.codePrefix === 'auth') {
        return next({ status: 400, message: 'Invalid token' });
      } else {
        return next(err);
      }
    }
  } else {
    return next({ status: 401, message: 'Unauthorized' });
  }
};

module.exports = authorization;
