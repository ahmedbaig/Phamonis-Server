'use strict';

const fs = require('fs');
const path = require('path');
const PoseModel = require('./pose.model')
const PiModel = require('../pi/pi.model')
const ERModel = require('../emergencyRequests/emergencyRequests.model')
const _ = require('lodash');


exports.create = async function(req, res) {
    // console.log("Pose recieved:", req.body, req.files)
    console.log(JSON.parse(req.body.pose))
    PiModel.findOne({ serial_number: req.body.serial_number }).exec(async(err, pi) => {
        console.log(pi)
        if (pi == null) {
            res.send({
                success: false,
                message: "Device not registered"
            })
        }
        if (pi.user == "") {
            console.log(pi)
            res.send({
                success: false,
                message: "No user connected"
            })

        }
        await PiModel.findByIdAndUpdate(pi._id, { status: true })
        let pose = new PoseModel();
        var filename = Date.now();
        let dir = './dist/App/assets/images/pose/' + pi.serial_number
        if (!fs.existsSync(dir)) {
            console.log("not exist", dir)
            fs.mkdirSync(dir, { recursive: true }, (err) => {
                if (err) throw err;
            });;
        }
        let filePath = path.join('./dist/App/assets/images/pose/' + pi.serial_number, filename + ".jpeg")

        fs.writeFileSync(filePath, req.files.pose.data);
        req.body.path = pi.serial_number + "/" + filename + ".jpeg";
        pose.pi = pi._id;
        pose.user = pi.user;
        pose.item = req.body.path
        pose.pose = JSON.parse(req.body.pose)
        await pose.save(async(err, doc) => {
            console.log(err, doc)
            if (err) {
                //console.log(err);
                var user = {
                    success: false,
                    message: 'Error: Server error'
                };
            }
            console.log("Image uploaded")

            await PoseModel.find({ pi: pi._id }, async function(err, doc) {
                let poses = _.reverse(_.sortBy(doc, [function(o) { return o.timeStamp }]))
                if (poses[0].length != 0 && poses[1].length != 0) {
                    console.log("Match finding started..")
                    let matchFind = [
                        _.find(poses[0], { "x": poses[1].x, "y": poses[1].y, "partName": "RShoulder", "score": poses[1].score }),
                        _.find(poses[0], { "x": poses[1].x, "y": poses[1].y, "partName": "LShoulder", "score": poses[1].score }),
                        _.find(poses[0], { "x": poses[1].x, "y": poses[1].y, "partName": "RElbow", "score": poses[1].score }),
                        _.find(poses[0], { "x": poses[1].x, "y": poses[1].y, "partName": "LElbow", "score": poses[1].score }),
                        _.find(poses[0], { "x": poses[1].x, "y": poses[1].y, "partName": "RWrist", "score": poses[1].score }),
                        _.find(poses[0], { "x": poses[1].x, "y": poses[1].y, "partName": "LWrist", "score": poses[1].score }),
                        _.find(poses[0], { "x": poses[1].x, "y": poses[1].y, "partName": "RHip", "score": poses[1].score }),
                        _.find(poses[0], { "x": poses[1].x, "y": poses[1].y, "partName": "LHip", "score": poses[1].score }),
                    ]

                    if (matchFind.length != 0) {
                        console.log("Matches found")
                        let er = {
                            pi: pi._id,
                            user: pi.user,
                            comments: "Pose did not change. Attention required."
                        }
                        await ERModel.create(er).then(() => {
                            console.log("Emergency Request posted")
                        })
                    } else {
                        console.log("No matches found")

                        console.log("Alternate analysis started..")
                        let alterMatchFind = [
                            _.find(poses[0], { "partName": "RShoulder" }),
                            _.find(poses[0], { "partName": "LShoulder" }),
                            _.find(poses[0], { "partName": "RElbow" }),
                            _.find(poses[0], { "partName": "LElbow" }),
                            _.find(poses[0], { "partName": "RWrist" }),
                            _.find(poses[0], { "partName": "LWrist" }),
                            _.find(poses[0], { "partName": "RHip" }),
                            _.find(poses[0], { "partName": "LHip" }),
                        ]
                        if (alterMatchFind.length != 0) {
                            console.log("Alternates found")
                            let er = {
                                pi: pi._id,
                                user: pi.user,
                                comments: "Pose alert points recognized. Attention required."
                            }
                            await ERModel.create(er).then(() => {
                                console.log("Emergency Request posted")
                            })
                        }
                    }
                } else {
                    console.log("Match finding failed. Vectors blank")
                }

            })
            return res.send({ success: true, message: "Image uploaded" });
        });

    })
}

exports.delete = async function(req, res) {
    try {
        await PoseModel.findByIdAndUpdate(req.params.item, { isDeleted: true });
        res.send({
            success: true,
            message: "Image removed"
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.getall = async function(req, res) {
    try {
        await PoseModel.find({ user: req.params.user, isDeleted: false }).exec((err, arr) => {
            res.send({
                success: true,
                items: arr
            })
        })
    } catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}