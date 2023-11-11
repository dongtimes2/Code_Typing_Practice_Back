import express from 'express';

import {
  getLanguagesList,
  postLanguageInfo,
} from './controller/language.controller.js';

const router = express.Router();

router.get('/', getLanguagesList);
router.post('/', postLanguageInfo);

export default router;
