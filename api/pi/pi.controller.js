'use strict';  


const PiModel = require('./pi.model');
const UserModel = require('../user/user.model');
const _ = require('lodash');

exports.create = async function(req,res){
    try{
        await PiModel.create(req.body)
        .then(function (){
            // sending access token
            res.send({
                success: true,
                message: "Pi Created"
            }); 
        }) 
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }  
}

exports.update = async function(req,res){
    try{
        await PiModel.findOneAndUpdate({_id: req.params.device}, req.body)
        .then(function (){
            // sending access token
            res.send({
                success: true,
                message: "Pi Updated"
            }); 
        }) 
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }  
}

exports.getDeviceById = async function (req, res){
    try{
        let devices = {}
        let users = await UserModel.find({}) 
        await PiModel.findById(req.params.device)
        .exec(function (err, doc){
            if(doc.user != null){ 
                Promise.all(users.map(user=>{
                    if(user._id == doc.user){ 
                        let newdoc = doc.toObject() 
                        newdoc.detail = _.clone(user)
                        devices = newdoc 
                    }
                })).then(()=>{
                    res.send({
                        success: true,
                        device: devices
                    }); 
                }) 
            }else{ 
                res.send({
                    success: true,
                    device: doc
                }); 
            } 
        }) 
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    } 
}

exports.getDeviceAll = async function (req, res){
    try{
        let devices = []
        let users = await UserModel.find({}) 
        await PiModel.find({})
        .exec(function (err, doc){
            Promise.all(doc.map(async device=>{ 
                if(device.user != null){ 
                    Promise.all(users.map(user=>{
                        if(user._id == device.user){ 
                            let newdoc = device.toObject() 
                            newdoc.detail = _.clone(user)
                            devices.push(newdoc) 
                        }
                    })) 
                }else{
                    devices.push(device)
                }
            })).then(()=>{
                res.send({
                    success: true,
                    devices: devices
                }); 
            }) 
        }) 
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    } 
}

exports.removeDeviceById = async function(req, res){
    try{
        await PiModel.remove({_id: req.params.device})
        .exec(function (err){  
            res.send({
                success: true,
                message: "Device removed"
            }); 
        }) 
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    } 
}