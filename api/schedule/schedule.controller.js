const ScheduleModel = require('./schedule.model');


// exports.create = async function(req, res){
//     try{
//         await HospitalModel.create(req.body).then((doc)=>{ 
//             res.send({
//                 success: true,
//                 message: "Hopital Created",
//                 hospital: doc
//             })
//         })
//     }catch(e){
//         res.send({
//             success: false,
//             message: e.message
//         })
//   }
// }