import express from 'express';

import {
  getPracticeData,
  postPracticeData,
} from './controller/practice.controller.js';
const router = express.Router();

router.get('/:language', getPracticeData);
router.post('/:language', postPracticeData);

export default router;
