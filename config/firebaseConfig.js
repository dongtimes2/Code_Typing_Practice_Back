const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(process.env.SERVICE_SECRET_KEY),
});

module.exports = admin;
