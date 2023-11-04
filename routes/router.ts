import express from 'express';

import index from './index.js';
import languages from './languages.js';
import login from './login.js';
import users from './users.js';
import authorization from '../middleware/authorization.js';

const router = express.Router();

router.use('/', index);
router.use('/auth/login', login);
router.use('/users', authorization, users);
router.use('/languages', languages);

export default router;
