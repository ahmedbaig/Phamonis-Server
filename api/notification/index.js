'use strict';

var express = require('express');
var controller = require('./notification.controller');
// var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

// router.post('/create-notification/:token', auth.isAuthenticated(), controller.create)

// router.get('/read-notification/:token/:user', auth.isAuthenticated(), controller.read)

// router.get('/read-all-notification/:token/:user', auth.isAuthenticated(), controller.readAll)

module.exports = router;
