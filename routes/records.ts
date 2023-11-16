import express from 'express';

import { getRecord, postRecord } from './controller/records.controller.js';

const router = express.Router();

router.get('/', getRecord);
router.post('/', postRecord);

export default router;
