const DoctorModel = require("./doctor.model")


exports.update = async function(req, res){
    try{
        await DoctorModel.update({_id: req.body.id}, req.body).exec((err, doc)=>{
            if(err){
                res.send({
                    success: false,
                    message: err
                })
            }

            res.send({
                success: true,
                message: "Doctor Updated"
            })
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}