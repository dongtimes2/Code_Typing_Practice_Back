import express from 'express';

import auth from './auth.js';
import index from './index.js';
import languages from './languages.js';
import practice from './practice.js';
import records from './records.js';
import users from './users.js';
import authorization from '../middleware/authorization.js';

const router = express.Router();

router.use('/', index);
router.use('/auth', auth);
router.use('/languages', languages);
router.use('/practice', authorization, practice);
router.use('/users', authorization, users);
router.use('/records', authorization, records);

export default router;
