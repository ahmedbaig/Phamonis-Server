'use strict';  


const PiModel = require('./pi.model');
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
        await PiModel.findById(req.params.device)
        .exec(function (err, doc){
            // sending access token
            if(doc == null){
                res.send({
                    success: false,
                    message: "Device not found"
                })
            }
            res.send({
                success: true,
                device: doc
            }); 
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
        await PiModel.find({})
        .exec(function (err, doc){
            // sending access token
            res.send({
                success: true,
                devices: doc
            }); 
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