import express from 'express';

import { getUser, patchUser } from './controller/users.controller.js';

const router = express.Router();

router.get('/', getUser);
router.patch('/', patchUser);

export default router;
