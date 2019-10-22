'use strict';  


const NotificationModel = require('./notification.model');
const _ = require('lodash');

exports.create = async function(req,res){
    try{
        await NotificationModel.create(req.body)
        .then(function (){
            // sending access token
            res.send({
                success: true,
                message: "Notification sent"
            }); 
        }) 
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }  
}
 
exports.readAll = async function(req,res){
    try{
        await NotificationModel.findOne({user:req.params.user})
        .exec(function (err, doc){
            // sending access notification
            let read = _.filter(doc, o=>{return o.read==true})
            let unread = _.filter(doc, o=>{return o.read==false})
            read = _.sortBy(read, [o=>{return o.createdt}])
            unread = _.sortBy(unread, [o=>{return o.createdt}])
            res.send({
                success: true,
                notifications: doc,
                read: read, 
                unread: unread
            }); 
        }) 
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }  
}

exports.read = async function(req,res){
    try{
        await NotificationModel.findOneAndUpdate({user: req.params.user, _id: req.params.notification}, {read: true})
        .then(async function (){
            await NotificationModel.find({user: req.params.user}).exec((err, doc)=>{
                // sending access notification
                let read = _.filter(doc, o=>{return o.read==true})
                let unread = _.filter(doc, o=>{return o.read==false})
                read = _.sortBy(read, [o=>{return o.createdt}])
                unread = _.sortBy(unread, [o=>{return o.createdt}])
                res.send({
                    success: true,
                    notifications: doc,
                    read: read, 
                    unread: unread
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



