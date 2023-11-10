import express from 'express';

import {
  get,
  getLanguagesList,
  postLanguageInfo,
} from './controller/language.controller.js';

const router = express.Router();

router.get('/', getLanguagesList);
router.post('/', postLanguageInfo);

router.get('/:language', get);

export default router;
