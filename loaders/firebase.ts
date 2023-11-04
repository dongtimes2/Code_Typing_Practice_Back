import admin from 'firebase-admin';

import { SERVICE_SECRET_KEY } from '../config/env';

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(SERVICE_SECRET_KEY)),
});
