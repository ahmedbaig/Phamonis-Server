'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const PiModel = require('../pi/pi.model')
const PiSession = require('../piSession/piSession.model')
const UserModel = require('../user/user.model')
const PoseModel = require('../pose/pose.model')
const ConnectionsModel = require('./connections.model')
const NotificationModel = require('../notification/notification.model')

exports.fetchConnections = async function(req, res) {
    try {
        let connectionrequests = []
        await ConnectionsModel.find({ user: req.user._id }, async(err, requests) => {
            await Promise.all(_.map(requests, async request => {
                await UserModel.findById(request.user, async(err, user) => {

                    user.accountActivated.token = null
                    user.points = null
                    user.profileApproved = null
                    user.forgotPasswordToken = null
                    user.salt = null
                    user.hashedPassword = null
                    await UserModel.findById(request.connection, async(err, connection) => {

                        connection.accountActivated.token = null
                        connection.points = null
                        connection.profileApproved = null
                        connection.forgotPasswordToken = null
                        connection.salt = null
                        connection.hashedPassword = null

                        let obj = {
                            "_id": request._id,
                            "declined": request.declined,
                            "status": request.status,
                            "user": user,
                            "connection": connection
                        }
                        connectionrequests.push(_.clone(obj))
                    })
                })
            })).then(() => {
                _.delay(() => {
                    res.send({
                        success: true,
                        requests: connectionrequests
                    })
                }, 2000)
            })
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.fetchStaffConnections = async function(req, res) {
    try {
        let connectionrequests = []
        await ConnectionsModel.find({ connection: req.user._id }, async(err, requests) => {
            await Promise.all(_.map(requests, async request => {
                await UserModel.findById(request.user, async(err, user) => {

                    user.accountActivated.token = null
                    user.points = null
                    user.profileApproved = null
                    user.forgotPasswordToken = null
                    user.salt = null
                    user.hashedPassword = null
                    await UserModel.findById(request.connection, async(err, connection) => {

                        connection.accountActivated.token = null
                        connection.points = null
                        connection.profileApproved = null
                        connection.forgotPasswordToken = null
                        connection.salt = null
                        connection.hashedPassword = null

                        let obj = {
                            "_id": request._id,
                            "declined": request.declined,
                            "status": request.status,
                            "user": user,
                            "connection": connection
                        }
                        connectionrequests.push(_.clone(obj))
                        console.log(obj)
                    })
                })
            })).then(() => {
                _.delay(() => {
                    res.send({
                        success: true,
                        requests: connectionrequests
                    })
                }, 2000)
            })
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.declineRequest = async function(req, res) {
    try {
        await ConnectionsModel.update({ _id: req.body.connectionId }, { declined: true }, () => {
            res.send({
                success: true,
                message: "Request declined"
            })
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.undeclineRequest = async function(req, res) {
    try {
        await ConnectionsModel.update({ _id: req.body.connectionId }, { declined: false }, () => {
            res.send({
                success: true,
                message: "Request declined"
            })
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.addRequest = async function(req, res) {
    try {
        await UserModel.findOne({ 'code.code': req.body.code }, async(err, user) => {
            if (user == null) {
                return res.send({
                    success: false,
                    message: "Authentication Error! Pin not found"
                })
            } else {
                req.body.user = user._id
                await ConnectionsModel.findOne({ user: user._id, connection: req.body.connection }, async(err, existing) => {
                    if (existing != null) {
                        return res.send({
                            success: false,
                            message: "Your request has already been sent"
                        })
                    } else {
                        await ConnectionsModel.create(req.body).then(async(request) => {
                            await UserModel.findById(req.body.connection, async(err, connection) => {
                                let notification = {
                                    user: user._id,
                                    message: `You have a new connection request from ${connection.firstName} ${connection.lastName}`,
                                    link: request._id
                                }
                                await NotificationModel.create(notification).then(() => {
                                    res.send({ success: true, message: "Your request has been sent" })
                                })
                            })
                        })
                    }
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

exports.acceptRequest = async function(req, res) {
    try {
        await ConnectionsModel.update({ _id: req.body.connectionId }, { declined: false, status: true }, () => {
            res.send({
                success: true,
                message: "Request accepted"
            })
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.fetchConnectionString = async function(req, res) {
    try {
        await UserModel.find({ _id: req.user._id }, async(err, user) => {
            res.send({
                success: true,
                code: user[0].code
            })
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}