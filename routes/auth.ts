import express from 'express';

import { postLogin } from './controller/login.controller.js';
import { postLogout } from './controller/logout.controller.js';
import { postRefresh } from './controller/refresh.controller.js';
import authorization from '../middleware/authorization.js';

const router = express.Router();

router.post('/refresh', postRefresh);
router.post('/login', postLogin);
router.post('/logout', authorization, postLogout);

export default router;
