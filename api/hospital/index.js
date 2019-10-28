'use strict';

var express = require('express');
var controller = require('./hospital.controller');
// var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/create/:token', auth.isAdmin(), controller.create);

router.post('/detail/:token', auth.isAdmin(), controller.detail);

router.post('/update/:token', auth.isAdmin(), controller.update);

router.post('/delete/:token', auth.isAdmin(), controller.delete)

router.get('/all-hospitals/:token', auth.isAdmin(), controller.all)

router.get('/all-hospitals-staff/:token', auth.isStaff(), controller.allStaff)

module.exports = router;
