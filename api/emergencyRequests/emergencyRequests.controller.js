const ERModel = require('./emergencyRequests.model');

exports.create = async function(req, res){
    try{
        await ERModel.create(req.body).then((doc)=>{ 
            res.send({
                success: true,
                message: "Request Created",
                request: doc
            })
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}
