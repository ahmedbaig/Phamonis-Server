'use strict';

var express = require('express');
var controller = require('./pi.controller');
// var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/create-device/:token', auth.isAdmin(), controller.create)

router.post('/update-device/:token/:device', auth.isAdmin(), controller.update)

router.get('/get-device-detail/:token/:device', auth.isAuthenticated(), controller.getDeviceById)

router.get('/get-device-all/:token', auth.isAdmin(), controller.getDeviceAll)

router.get('/remove-device/:token/:device', auth.isAdmin(), controller.removeDeviceById)

// router.post('/device-status/:token/:device', auth.isPiAuthenticated(), controller.deviceStatus)

module.exports = router;
