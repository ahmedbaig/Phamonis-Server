'use strict';

var express = require('express');
var controller = require('./connections.controller');
// var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

// IOS Application API

router.get('/connections-list/:token', auth.isAuthenticated(), controller.fetchConnections);

router.get('/connections-string/:token', auth.isAuthenticated(), controller.fetchConnectionString);

router.post('/decline-connection/', auth.isAuthenticated(), controller.declineRequest);

router.post('/add-connection/:token', auth.isAuthenticated(), controller.addRequest);

router.post('/accept-connection/:token', auth.isAuthenticated(), controller.acceptRequest);

module.exports = router;