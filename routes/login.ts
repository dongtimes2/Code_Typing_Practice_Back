import express from 'express';

import { post } from './controller/login.controller.js';

const router = express.Router();

router.post('/', post);

export default router;
