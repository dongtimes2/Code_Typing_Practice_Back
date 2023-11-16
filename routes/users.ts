import express from 'express';

import { patchUser } from './controller/users.controller.js';

const router = express.Router();

router.patch('/', patchUser);

export default router;
