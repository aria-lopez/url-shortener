const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.post('/create-short-link', controllers.createLink);
router.post('/retrieve-short-link', controllers.retrieveLink);

module.exports = router;
