const express = require('express');
const router = express.Router();

const usersController = require('./controller/users.controller');

router.get('/:id/recode/:language', usersController.recordGet);

router.get('/:id', usersController.get);
router.patch('/:id', usersController.patch);

module.exports = router;
