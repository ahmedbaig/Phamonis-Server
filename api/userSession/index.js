'use strict';

var express = require('express');
var controller = require('./userSession.controller');
// var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/verify', controller.verify);

router.get('/logout', controller.logout);

module.exports = router;