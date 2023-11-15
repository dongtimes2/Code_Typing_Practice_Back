import express from 'express';

import { postRefresh } from './controller/refresh.controller.js';

const router = express.Router();

router.post('/', postRefresh);

export default router;
