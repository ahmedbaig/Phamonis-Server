const QualificationModel = require("./qualification.model")

exports.create = async function(req, res){
    try{
        await QualificationModel.create(req.body).exec((err, doc)=>{
            if(err){
                res.send({
                    success: false,
                    message: err
                })
            }
            res.send({
                success: true,
                message: "Qualification Created"
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
        await QualificationModel.update({_id: req.body._id}, req.body).exec((err, doc)=>{
            if(err){
                res.send({
                    success: false,
                    message: err    
                })
            }
            res.send({
                success: true,
                message: "Qualification update"
            })
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}