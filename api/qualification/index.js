'use strict';

var express = require('express');
var controller = require('./qualification.controller');
// var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post("./create", auth.isAuthenticated(), controller.create)

router.post("/update", auth.isAuthenticated(), controller.update)