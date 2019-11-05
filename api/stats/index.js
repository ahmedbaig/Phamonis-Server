'use strict';

var express = require('express');
var controller = require('./stats.controller');
// var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/dashboard-stats/:token', auth.isAdmin(), controller.dashboardStats);

// router.get('/verify/:token', auth.isPiAuthenticated(), controller.verify);

module.exports = router;