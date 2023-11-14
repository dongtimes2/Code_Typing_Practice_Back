import express from 'express';

import index from './index.js';
import languages from './languages.js';
import login from './login.js';
import practice from './practice.js';

const router = express.Router();

router.use('/', index);
router.use('/auth/login', login);
router.use('/languages', languages);
router.use('/practice', practice);

export default router;
