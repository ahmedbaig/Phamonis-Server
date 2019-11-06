'use strict';

var express = require('express');
var controller = require('./verify.controller');
// var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

// SMS phone verification

router.post('/verification-sms', controller.startService);

router.post('/fetch-verification', controller.fetchService);

router.post('/check-verification', controller.checkService);

module.exports = router;