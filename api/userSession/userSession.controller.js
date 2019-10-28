'use strict';
const UserSessionModel = require('./userSession.model')
const UserModel = require('../user/user.model')
const _ = require('lodash');

exports.verify = async function(req,res){
    try{
        await UserSessionModel.findById(req.query.token).exec( async (err, doc)=>{
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

            await UserModel.findById(doc.user).exec(async (err, doc)=>{
                if(err){
                    res.send({
                        success: false,
                        message: err.message
                    })
                }
                await UserSessionModel.findOneAndUpdate({_id: req.query.token}, {lastUsed: Date.now()})
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

exports.logout = async function (req, res){
    try{
        await UserSessionModel.findById(req.query.token).exec((err, doc)=>{
            doc.isDeleted = true
            doc.save()
            res.send({
                success: true,
                message: "Logged out successfully"}
            )
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}