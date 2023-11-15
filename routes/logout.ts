import express from 'express';

import { postLogout } from './controller/logout.controller.js';

const router = express.Router();

router.post('/', postLogout);

export default router;
