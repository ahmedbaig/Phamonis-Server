'use strict';

var express = require('express');
var controller = require('./pi.controller');
// var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/create-device/:token', auth.isAdmin(), controller.create)

router.post('/update-device/:token/:device', auth.isAdmin(), controller.update)

router.post('/update-device-user/:token/:device', auth.isAuthenticated(), controller.updateUser)

router.get('/get-device-detail/:token/:device', auth.isAuthenticated(), controller.getDeviceById)

router.get('/get-device-detail-user/:token', auth.isAuthenticated(), controller.getDeviceByUserId)

router.get('/get-device-detail-staff/:token/:id', auth.isAuthenticated(), controller.getDeviceStaffByUserId)

router.get('/get-device-all/:token', auth.isAuthenticated(), controller.getDeviceAll)

router.get('/remove-device/:token/:device', auth.isAdmin(), controller.removeDeviceById)

router.post('/pi-route-update/:token', auth.isPiAuthenticated(), controller.piRouteUpdate)

// router.post('/device-status/:token/:device', auth.isPiAuthenticated(), controller.deviceStatus)

module.exports = router;