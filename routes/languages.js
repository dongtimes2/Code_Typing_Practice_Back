const express = require('express');
const router = express.Router();

const languageController = require('./controller/language.controller');

router.get('/:language', languageController.get);

module.exports = router;
