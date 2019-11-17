'use strict';

var express = require('express');
var controller = require('./pose.controller');
// var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/upload-pose/:token', auth.isPiAuthenticated(), controller.create);

router.post('/delete/:token/:item', auth.isAuthenticated(), controller.delete);

router.get('/all-poses/:token/:user', auth.isAuthenticated(), controller.getall);

router.get('/status-poses/:token/:id', auth.isAuthenticated(), controller.statusPose);

module.exports = router;