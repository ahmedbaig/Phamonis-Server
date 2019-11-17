'use strict';

var express = require('express');
var controller = require('./chat.controller');
// var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

// IOS Application API

router.post('/insert-user/:token', auth.isAdmin(), controller.insertUser);

router.get('/get-contacts/:token', auth.isAuthenticated(), controller.getContacts);

module.exports = router;