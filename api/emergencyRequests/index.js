'use strict';

var express = require('express');
var controller = require('./emergencyRequests.controller');
// var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/create/:token', auth.isAuthenticated(), controller.create);

router.get('/get-requests/:token', auth.isAdmin(), controller.getRequests);

router.get('/get-user-requests/:token', auth.isAuthenticated(), controller.getUserRequests);

router.get('/request-status/:request/:token', auth.isAdmin(), controller.requestStatus);

// router.post('/detail/:token', auth.isAdmin(), controller.detail);

// router.post('/update/:token', auth.isAdmin(), controller.update);

// router.post('/delete/:token', auth.isAdmin(), controller.delete)

// router.get('/all-hospitals/:token', auth.isAdmin(), controller.all)

module.exports = router;