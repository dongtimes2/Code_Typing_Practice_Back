import express from 'express';

import {
  get,
  patch,
  recordGet,
  recordPatch,
} from './controller/users.controller.js';

const router = express.Router();

router.get('/:id/record/:language', recordGet);
router.patch('/:id/record/:language', recordPatch);

router.get('/:id', get);
router.patch('/:id', patch);

export default router;
