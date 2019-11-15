'use strict';


const PiModel = require('./pi.model');
const UserModel = require('../user/user.model');
const PoseModel = require('../pose/pose.model')
const PiSessions = require('../piSession/piSession.model')
const _ = require('lodash');

exports.create = async function(req, res) {
    try {
        await PiModel.findOne({ serial_number: req.body.serial_number }, async(err, doc) => {
            if (doc != null) {
                res.send({
                    success: false,
                    message: "Pi Model already in use"
                })
            } else {
                await PiModel.create(req.body)
                    .then(function() {
                        // sending access token
                        res.send({
                            success: true,
                            message: "Pi Created"
                        });
                    })
            }
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.piRouteUpdate = async function(req, res) {
    try {
        await PiModel.update({ _id: req.pi._id }, { route_ip: req.body.route_ip })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.update = async function(req, res) {
    try {
        await PiModel.findOneAndUpdate({ _id: req.params.device }, req.body)
            .then(function() {
                // sending access token
                res.send({
                    success: true,
                    message: "Pi Updated"
                });
            })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.updateUser = async function(req, res) {
    try {
        await PiModel.findOneAndUpdate({ _id: req.params.device }, { model: req.body.model, threshold: req.body.threshold })
            .then(function() {
                // sending access token
                res.send({
                    success: true,
                    message: "Pi Updated"
                });
            })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.getDeviceById = async function(req, res) {
    try {
        let device = {}

        await PiModel.findById(req.params.device)
            .exec(async function(err, doc) {
                if (doc.user != "") {
                    await UserModel.findById(doc.user, async(err, user) => {
                        let newdoc = doc.toObject()
                        newdoc.detail = _.clone(user)
                        await PoseModel.find({ pi: doc._id }, async(err, poses) => {
                            newdoc.poses = _.cloneDeep(_.sortBy(poses, [(o => {
                                return o.timeStamp
                            })]))
                            await PiSessions.find({ pi: doc._id }, (err, sessions) => {
                                newdoc.sessions = _.cloneDeep(_.sortBy(sessions, [(o) => {
                                    return o.timeStamp
                                }]))
                                device = newdoc
                                res.send({
                                    success: true,
                                    device: device
                                });
                            })
                        })
                    })
                } else {
                    res.send({
                        success: true,
                        device: doc
                    });
                }
            })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.getDeviceByUserId = async function(req, res) {
    try {
        let device = {}

        await PiModel.findOne({ user: req.user._id })
            .exec(async function(err, doc) {
                if (doc.user != "") {
                    await UserModel.findById(doc.user, async(err, user) => {
                        let newdoc = doc.toObject()
                        newdoc.detail = _.clone(user)
                        await PoseModel.find({ pi: doc._id }, async(err, poses) => {
                            newdoc.poses = _.cloneDeep(_.sortBy(poses, [(o => {
                                return o.timeStamp
                            })]))
                            await PiSessions.find({ pi: doc._id }, (err, sessions) => {
                                newdoc.sessions = _.cloneDeep(_.sortBy(sessions, [(o) => {
                                    return o.timeStamp
                                }]))
                                device = newdoc
                                res.send({
                                    success: true,
                                    device: device
                                });
                            })
                        })
                    })
                } else {
                    res.send({
                        success: true,
                        device: doc
                    });
                }
            })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.getDeviceAll = async function(req, res) {
    try {
        let devices = []
        let users = await UserModel.find({})
        await PiModel.find({})
            .exec(function(err, doc) {
                Promise.all(doc.map(async device => {
                    if (device.user != "") {
                        Promise.all(users.map(user => {
                            if (user._id == device.user) {
                                let newdoc = device.toObject()
                                newdoc.detail = _.clone(user)
                                devices.push(newdoc)
                            }
                        }))
                    } else {
                        devices.push(device)
                    }
                })).then(() => {
                    console.log(devices)
                    res.send({
                        success: true,
                        devices: devices
                    });
                })
            })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.removeDeviceById = async function(req, res) {
    try {
        await PiModel.findById(req.params.device).then(async(doc) => {
            if (doc.user != "") {
                await UserModel.remove({ _id: req.params.device }).then(() => {

                })
            }
            await PiModel.remove({ _id: req.params.device })
                .exec(function(err) {
                    res.send({
                        success: true,
                        message: "Device removed"
                    });
                })
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}