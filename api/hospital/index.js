'use strict';

var express = require('express');
var controller = require('./hospital.controller');
// var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/create', auth.isAdmin(), controller.create);

router.post('/update', auth.isAdmin(), controller.update);

router.post('/delete', auth.isAdmin(), controller.delete)