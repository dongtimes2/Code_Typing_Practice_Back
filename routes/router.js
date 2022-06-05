const express = require('express');
const router = express.Router();

const users = require('./users');
const languages = require('./languages');
const login = require('./login');
const index = require('./index');

router.use('/', index);
router.use('/auth/login', login);
router.use('/users', users);
router.use('/languages', languages);

module.exports = router;
