'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const PiModel = require('../pi/pi.model')
const PiSession = require('../piSession/piSession.model')
const UsersModel = require('../user/user.model')
const PoseModel = require('../pose/pose.model')
const ConnectionsModel = require('./connections.model')
const NotificationModel = require('../notification/notification.model')

exports.fetchConnections = async function(req, res) {
    try {
        await ConnectionsModel.find({ user: req.user._id }, async(err, requests) => {
            res.send({
                success: true,
                requests
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

exports.addRequest = async function(req, res) {
    try {
        await ConnectionsModel.create(req.body).then(async(request) => {
            await UsersModel.findById(req.body.user, async(err, user) => {
                await UsersModel.findById(req.body.connection, async(err, connection) => {
                    let notification = {
                        user: req.body.connection,
                        message: `You have a new connection request ${user.firstName} ${user.lastName}`,
                        link: request._id
                    }
                    await NotificationModel.create(notification).then(() => {
                        res.send({ success: true, message: "Your request has been sent" })
                    })
                })
            })
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
        await UserModel.find({ code: req.user._id }, async(err, user) => {
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