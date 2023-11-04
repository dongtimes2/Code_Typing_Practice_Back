import express from 'express';

import { get } from './controller/language.controller.js';

const router = express.Router();

router.get('/:language', get);

export default router;
