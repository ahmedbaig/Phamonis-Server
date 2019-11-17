'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const UserModel = require('../user/user.model')
const ChatModel = require('./chat.model')

exports.getContacts = async function(req, res) {
    try {

        let connectionrequests = []
        if (req.query.role == 'patient') {
            await ConnectionsModel.find({ user: req.user._id }, async(err, requests) => {
                await ChatModel.findOne({ user: req.user._id }, async(err, user) => {
                    await Promise.all(_.map(requests, async request => {
                        await ChatModel.findOne({ user: request.connection }, async(err, connection) => {
                            connectionrequests.push(_.clone(connection))
                            console.log(connection)
                        })
                    })).then(() => {
                        _.delay(() => {
                            res.send({
                                success: true,
                                contacts: connectionrequests,
                                my: user
                            })
                        }, 2000)
                    })
                })
            })
        } else if (req.query.role == 'doctor') {
            await ConnectionsModel.find({ connection: req.user._id }, async(err, requests) => {
                await ChatModel.findOne({ user: req.user._id }, async(err, user) => {
                    await Promise.all(_.map(requests, async request => {
                        await ChatModel.findOne({ user: request.connection }, async(err, connection) => {
                            connectionrequests.push(_.clone(connection))
                            console.log(connection)
                        })
                    })).then(() => {
                        _.delay(() => {
                            res.send({
                                success: true,
                                contacts: connectionrequests,
                                my: user
                            })
                        }, 2000)
                    })
                })
            })
        }
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.insertUser = async function(req, res) {
    try {
        await ChatModel.create(req.body).then((doc) => {
            res.send({
                success: true,
                message: "User Inserted"
            })
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}