'use strict';

var express = require('express');
var controller = require('./piSession.controller');
// var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/create-session', controller.create);

router.post('/pi-tunnel/:token', auth.isPiAuthenticated(), controller.create);

router.get('/verify/:token', auth.isPiAuthenticated(), controller.verify);

module.exports = router;
