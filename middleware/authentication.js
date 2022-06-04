const admin = require('../config/firebaseConfig');

const decodeToken = async (req, res, next) => {
  if (req.headers?.authorization?.startsWith('Bearer')[1]) {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decodeToken = await admin.auth().verifyIdToken(token);

      req.user = decodeToken;
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }

  next();
};

module.exports = decodeToken;
