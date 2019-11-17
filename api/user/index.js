'use strict';

var express = require('express');
var controller = require('./user.controller');
// var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/new-user-signup', controller.create);

router.post('/upload-user-picture/:userId/:token', auth.isAuthenticated(), controller.uploadUserPicture);

router.post('/login-user', controller.loginUser);

router.post('/send-forgot-password-email', controller.forgotPassword);

router.post('/reset-password/:forgotPasswordToken', controller.resetPassword);

router.get('/activate-account/:token', controller.activateAccount);

router.get('/get-users/:token', auth.isAdmin(), controller.getUsers);

router.get('/get-user/:userId/:token', auth.isAuthenticated(), controller.getUserById);

router.post('/update/:userId/:token', auth.isAuthenticated(), controller.update);

router.post('/new-user/:token', auth.isStaff(), controller.createUser)

router.post('/new-user-admin/:token', auth.isAdmin(), controller.createUserAdmin)

router.post('/remove-user/:token', auth.isAdmin(), controller.delete);

router.post('/upload-qualification/:token', auth.isAuthenticated(), controller.uploadQualification)

router.get('/get-users-doctors/:token', auth.isStaff(), controller.getUserDoctors);

router.get('/get-users-patients/:token', auth.isStaff(), controller.getUserPatients);

module.exports = router;