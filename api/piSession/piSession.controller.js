'use strict';
const PiSessionModel = require('./piSession.model')
const PiModel = require('../pi/pi.model')
const _ = require('lodash');

exports.create = async function(req, res){
    
    await PiModel.findOne({serial_number: req.body.serial_number}).exec(async (err, pi)=>{
        console.log(pi)
        if(pi == null){
            res.send({
                success: false,
                message: "Device not registered"
            })
        }
        let routeIp = req.body.route_ip.split(' ')
        if(pi.user != ""){
            console.log(pi)
            console.log(routeIp)
            await PiModel.findByIdAndUpdate(pi._id, {status: true, route_ip: routeIp[0]}, (err, update)=>{
                console.log("PI route set")
            })
        }
        
        let session = new PiSessionModel();
                        
        session.pi = pi._id;
        await session.save(async (err, doc) => {
            console.log(err, doc)
            if (err) {
                //console.log(err);
                var user = {
                    success: false,
                    message: 'Error: Server error'
                };
            }
            await PiModel.findByIdAndUpdate(pi._id, {status: true, route_ip: routeIp[0], session_token: doc._id}, (err, update)=>{
                //console.log('Session Token: ', doc._id);
                var device = {
                    success: true,
                    message: 'Valid sign in',
                    token: doc._id,
                    pi: pi
                };
                return res.send(device);
            })
        });
    })
}

exports.verify = async function(req,res){
    try{
        await PiSessionModel.findById(req.query.token).exec( async (err, doc)=>{
            if(err){
                res.send({
                    success: false,
                    message: err.message
                })
            }
            if(doc == null){
                res.send({
                    success: false,
                    message: "Not Found"
                })
            }

            await PiModel.findById(doc.pi).exec(async (err, doc)=>{
                if(err){
                    res.send({
                        success: false,
                        message: err.message
                    })
                }
                await PiSessionModel.findOneAndUpdate({_id: req.query.token}, {lastUsed: Date.now()})
                await PiModel.findByIdAndUpdate(doc.pi, {status: true, active: true})
                res.send({
                    success: true, 
                    message: "valid token",
                    user: doc
                })
            })
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}
