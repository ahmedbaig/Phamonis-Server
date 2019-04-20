const HospitalModel = require('./hospital.model');

exports.create = async function(req, res){
    try{
        await HospitalModel.create(req.body).exec((err, doc)=>{
            if(err){
                res.send({
                    success: false,
                    message: err
                })
            }

            res.send({
                success: true,
                message: "Hopital Created",
                hospital: doc
            })
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.update = async function(req, res){
    try{
        await HospitalModel.update({_id: req.body.id}, req.body).exec((err, doc)=>{
            if(err){
                res.send({
                    success: false,
                    message: err
                })
            }

            res.send({
                success: true,
                message: "Hopital Updated"
            })
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.delete = async function(req, res){
    try{
        await HospitalModel.remove({_id: req.body.id}).exec((err, doc)=>{
            if(err){
                res.send({
                    success: false,
                    message: err
                })
            }

            res.send({
                success: true,
                message: "Hopital Removed"
            })
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}