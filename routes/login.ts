import express from 'express';

import { postLogin } from './controller/login.controller.js';

const router = express.Router();

router.post('/', postLogin);

export default router;
