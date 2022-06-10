const express = require('express');
const router = express.Router();

const usersController = require('./controller/users.controller');

router.get('/:id/record/:language', usersController.recordGet);
router.patch('/:id/record/:language', usersController.recordPatch);

router.get('/:id', usersController.get);
router.patch('/:id', usersController.patch);

module.exports = router;
