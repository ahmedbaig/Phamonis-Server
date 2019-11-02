'use strict';

const fs = require('fs');
const path = require('path');
const PoseModel = require('./pose.model')
const PiModel = require('../pi/pi.model')
const _ = require('lodash');


exports.create = async function(req, res){ 
    console.log(req.body, req.files)
    PiModel.findOne({serial_number: req.body.serial_number}).exec(async (err, pi)=>{
        console.log(pi)
        if(pi == null){
            res.send({
                success: false,
                message: "Device not registered"
            })
        }
        if(pi.user == ""){
            console.log(pi)
            res.send({
                success: false,
                message: "No user connected"
            })

        }
        await PiModel.findByIdAndUpdate(pi._id, {status: true})
        let pose = new PoseModel(); 
        var filename = Date.now();
        let dir = './dist/App/assets/images/pose/'+pi.serial_number
        if (!fs.existsSync(dir)){
            console.log("not exist", dir)
            fs.mkdirSync(dir, { recursive: true }, (err) => {
                if (err) throw err;
              });;
        }
        let filePath = path.join('./dist/App/assets/images/pose/'+pi.serial_number ,   filename+".jpeg" )

        fs.writeFileSync(filePath,req.files.pose.data);
        req.body.path = pi.serial_number+"/"+filename+".jpeg";        
        pose.pi = pi._id;
        pose.user = pi.user;
        pose.item = req.body.path
        await pose.save((err, doc) => {
            console.log(err, doc)
            if (err) {
                //console.log(err);
                var user = {
                    success: false,
                    message: 'Error: Server error'
                };
            } 
            return res.send({success: true, message: "Image uploaded"});
        });
    })
}

exports.delete = async function(req, res){
    try{
        await PoseModel.findByIdAndUpdate(req.params.item, {isDeleted: true});
        res.send({
            success: true,
            message: "Image removed"
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.getall = async function(req, res){
    try{
        await PoseModel.find({user: req.params.user, isDeleted: false}).exec((err, arr)=>{
            res.send({
                success: true,
                items: arr
            })
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }  
}