import express from 'express';

import index from './index.js';
import languages from './languages.js';
import login from './login.js';
import logout from './logout.js';
import practice from './practice.js';
import refresh from './refresh.js';
import users from './users.js';
import authorization from '../middleware/authorization.js';

const router = express.Router();

router.use('/', index);
router.use('/auth/refresh', refresh);
router.use('/auth/login', login);
router.use('/auth/logout', authorization, logout);
router.use('/languages', languages);
router.use('/practice', authorization, practice);
router.use('/users', authorization, users);

export default router;
