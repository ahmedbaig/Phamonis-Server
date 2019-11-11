'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const PiModel = require('../pi/pi.model')
const PiSession = require('../piSession/piSession.model')
const UsersModel = require('../user/user.model')
const PoseModel = require('../pose/pose.model')

exports.dashboardStats = async function(req, res) {
    try {
        await PoseModel.find({}, async(err, poses) => {
            let poseGroup = _.groupBy(poses, 'timeStamp')
            await PiModel.find({}, async(err, pis) => {
                let piGroup = _.groupBy(pis, 'timeStamp')
                let deviceStatusGroup = _.groupBy(pis, 'status')
                await UsersModel.find({}, async(err, users) => {
                    let userGroup = _.groupBy(users, 'role')
                    res.send({
                        success: true,
                        poseGroup,
                        piGroup,
                        deviceStatusGroup,
                        userGroup
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

exports.dashboard = async function(req, res) {
    try {
        await UsersModel.findById(req.user._id, async(err, user) => {
            await PoseModel.find({ user: req.user._id }, async(err, poses) => {

            })
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}