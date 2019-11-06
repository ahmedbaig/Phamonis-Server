'use strict';

const ERModel = require('./emergencyRequests.model');
const UserModel = require('../user/user.model');
const PiModel = require('../pi/pi.model');
const _ = require('lodash');

exports.create = async function(req, res) {
    try {
        await ERModel.create(req.body).then((doc) => {
            res.send({
                success: true,
                message: "Request Created",
                request: doc
            })
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.getRequests = async function(req, res) {
    try {
        let reqs = []
        await ERModel.find({ read: false }).sort({ createdt: -1 }).then(async(doc) => {
            await Promise.all(_.map(doc, async one => {
                await UserModel.findById(one.user, async(err, user) => {
                    console.log(user)
                    await PiModel.findById(one.pi, async(err, pi) => {
                        console.log(pi)
                        reqs.push({
                            reqeust: _.clone(one),
                            user: _.clone(user),
                            pi: _.clone(pi)
                        })
                    })
                })
            })).then(() => {
                _.delay(() => {
                    res.send({
                        success: true,
                        requests: reqs
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

exports.requestStatus = async function(req, res) {
    try {
        await ERModel.findOneAndUpdate({ _id: req.params.request }, { read: true })
        res.send({
            success: true,
            message: "request updated"
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}