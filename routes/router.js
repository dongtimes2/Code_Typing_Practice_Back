const express = require('express');
const router = express.Router();

const users = require('./users');
const languages = require('./languages');
const login = require('./login');
const index = require('./index');
const authorization = require('../middleware/authorization');

router.use('/', index);
router.use('/auth/login', login);
router.use('/users', authorization, users);
router.use('/languages', authorization, languages);

module.exports = router;
