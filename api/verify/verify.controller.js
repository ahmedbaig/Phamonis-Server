'use strict';

const _ = require('lodash');
const moment = require('moment');
var mongoose = require('mongoose');
var request = require('request');

const UserModel = require('../user/user.model');
const VerificationModel = require('./verify.model');
const UserSession = require('../userSession/userSession.model');
const accountSid = '';
const authToken = '';
const serviceId = '';
const client = require('twilio')(accountSid, authToken);



exports.startService = async function(req, res) {
    try {
        if (req.headers.authorization_token == accountSid && req.headers.service_id == serviceId) {
            client.verify.services(serviceId)
                .verifications
                .create({ to: req.body.phone, channel: 'sms' })
                .then(async message => {
                    // await UserModel.update({_id: req.user._id}, {phone: req.body.phone})
                    let user = await UserModel.findOne({ phone: req.body.phone })
                    let status = "new"
                    await VerificationModel.create(message, async function(err, verifier) {
                        if (user != null) {
                            await VerificationModel.update({ _id: verifier._id }, { user: user._id })
                            status = "existing"
                        }
                        res.send({
                            success: true,
                            message: "Verification code sent.",
                            sid: message.sid,
                            user,
                            status
                        })
                    })
                });
        } else {
            res.send({
                success: false,
                message: "Mismatch headers"
            })
        }
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.fetchService = async function(req, res) {
    try {
        if (req.headers.authorization_token == accountSid && req.headers.service_id == serviceId) {
            client.verify.services(serviceId)
                .verifications(req.body.sid)
                .fetch()
                .then(async message => {
                    console.log(message)
                        // let user = await UserModel.findById(req.user._id)
                    let verification = await VerificationModel.find({ sid: req.body.sid, valid: false })
                    res.send({
                        success: true,
                        data: message,
                        // user,
                        verification
                    })
                });
        } else {
            res.send({
                success: false,
                message: "Mismatch headers"
            })
        }
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.checkService = async function(req, res) {
    try {
        if (req.headers.authorization_token == accountSid && req.headers.service_id == serviceId) {
            client.verify.services(serviceId)
                .verificationChecks
                .create({ to: req.body.phone, code: req.body.code })
                .then(async message => {
                    const user = await UserModel.findOne({ phone: req.body.phone })
                    let status = "new"
                    if (message.valid == true) {
                        // await UserModel.update({_id: req.user._id}, {phone: req.body.phone})
                        await VerificationModel.update({ sid: req.body.sid }, message)
                        await VerificationModel.update({ sid: req.body.sid }, { updatedt: moment() })
                        console.log(user)
                        if (user != null) {
                            await UserModel.update({ _id: user._id }, { phone: req.body.phone })
                            await UserModel.find({ phone: req.body.phone, _id: { $ne: user._id } }, (err, users) => {
                                _.map(users, async u => {
                                    await UserModel.update({ _id: u._id }, { phone: null })
                                    console.log("Resetting phone numbers", u._id)
                                })
                            })
                            status = "existing"
                        }
                    }
                    // let user = await UserModel.findById(req.user._id)
                    if (status == "new") {
                        return res.send({
                            success: true,
                            verification: message,
                            status
                        })

                    } else {
                        const userSession = new UserSession();
                        userSession.user = user._id;
                        userSession.geoLocationData = req.body.data
                        await userSession.save((err, doc) => {
                            if (err) {
                                //console.log(err);
                                var user_ = {
                                    success: false,
                                    message: 'Error: Server error'
                                };
                            }
                            //console.log('Session Token: ', doc._id);
                            var user_ = {
                                success: true,
                                message: 'Valid sign in',
                                token: doc._id,
                                status,
                                verification: message,
                                data: user
                            };
                            return res.send(user_);
                        });
                    }
                });
        } else {
            res.send({
                success: false,
                message: "Mismatch headers"
            })
        }
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}
