'use strict';

var express = require('express');
var controller = require('./doctor.controller');
// var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/update', auth.isAuthenticated(), controller.update)