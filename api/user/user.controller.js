'use strict';

const fs = require('fs');
const path = require('path');
var crypto = require('crypto');


const UserService = require('./user.service');
const UserModel = require('./user.model'); 
const PatientModel = require('../patient/patient.model')
const DoctorModel = require('../doctor/doctor.model')
const NurseModel = require('../nurse/nurse.model')
const UtilService = require('../utility/util');
const htmlTemplateService = require('../utility/htmltemplates');
const UserSession = require('../userSession/userSession.model'); 
const _ = require('lodash');

exports.create = function(req,res){
    try{
        UserService.create(req.body)
        .then(async function(user){
            let emailtoken = UtilService.generateRandomToken();
            let htmlTemplate =  htmlTemplateService.accountActivation( user, emailtoken );
            // sending email to user for account activation
            await UtilService.sendEmail(user.email,'Account Activation',htmlTemplate)
          
            // saving token in user model
            await UserService.update({ _id : user._id },{ 'accountActivated.token': emailtoken,profileApproved: false })
            
        }).then( function (){
            // sending access token
            res.send({
                success: true,
                message: "You have successfully signed up. Account activition email has been sent to your account"
            }); 
        })
        .catch(function(error){
            //console.log('error')
            //console.log(error)
            if(error.errors && error.errors.email && error.errors.email.message == 'The specified email address is already in use.'){
                res.send({message: 'The specified email address is already in use.', success: false})
            }else if(error.errors && error.errors.email && error.errors.email.message == "Path `email` is required."){
                res.send({message: 'Email is required', success: false})
            }else if(error.message == 'Invalid password'){
                res.send({message: 'Invalid password', success: false})
            }else{
                handleError(res,error,500);
            }
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
    

}


exports.update = function(req,res){
    
    let data = req.body;
    //console.log(data);
    UserService.update({  _id : req.params.userId },data)
    .then(function(){
        res.send({message:'User has been upadated', success: true});
    })
    .catch(function(error){
        handleError(res,error,500)
    })

}

exports.uploadUserPicture = async function(req,res){

    try{

        // fetching user by its id
        let user = await UserModel.findById(req.params.userId)
        var filename = Date.now();
        let dir = ROOTPATH+'/dist/App/assets/image/user'
        if (!fs.existsSync(dir)){
            console.log("not exist", dir)
            fs.mkdirSync(dir, { recursive: true }, (err) => {
                if (err) throw err;
              });;
        }
        let filePath = path.join( ROOTPATH  , 'dist/App/assets/image/user' ,   filename+"."+ req.files.image.mimetype.split("/")[1]  )

        fs.writeFileSync(filePath,req.files.image.data);

        user['profilePicture'] = filename+"."+ req.files.image.mimetype.split("/")[1];
        UserService.update({  _id : req.params.userId },user)
        res.send({
            success: true,
            message: "Image uploaded successfully"
        })


    }catch(err){
       res.send({
           success: false,
           message: err.message
       })
    }

}

function handleError(res,error,code){
    res.status(code).json(error);
}


exports.loginUser = function (req, res){
    try{
        //console.log(req.body);
        if(req.body != undefined || req.body != "{}"){
            var {email, password} = req.body;

            UserModel.findOne({
                email: email.toLowerCase(),
              }, function(err, user) {
                 
                if (err){ res.send({success: false, message: err})}
        
                else if (!user) {
                  //console.log(user);
                  return res.send({
                    success: false,
                    message: 'This email is not registered.'
                  });
                } else  {
                    const variation = user;
                    if (!user.authenticate(password)) {
                        return res.send({
                        success: false,
                        message: 'This password is not correct.'
                      });
                    }

                    if(user.accountActivated.isTrue == false){
                        return res.send({
                        success: false,
                        message: 'Sorry! Your account is not approved via email.'
                      })
                    }

                    if(user.profileApproved == false){
                        return res.send({
                        success: false,
                        message: 'Sorry! Your account is not approved by admin.'
                      })
                    }
                  const userSession = new UserSession();
                  userSession.user = user._id;
                  userSession.save((err, doc) => {
                    if (err) {
                      //console.log(err);
                      var user = {
                        success: false,
                        message: 'Error: Server error'
                      };
                    }
                    //console.log('Session Token: ', doc._id);
                    var user = {
                      success: true,
                      message: 'Valid sign in',
                      token: doc._id,
                      user: doc
                    };
                    return res.send(user);
                  });
                }
              });
        }else{
        return res.send({
            success: false,
            message: "Please enter email and password"
        })   
        }
        
    }
    catch(e){
        //console.log(e);
        return res.send({
            success: false,
            message: e.message
        })
    }
    
}

exports.forgotPassword = async function(req, res){
    try {
        //console.log(req.body.email);
        let user = await UserModel.findOne({
          email: req.body.email
        })
    
        if (!user) {
          return res.send({success: false, message: 
            'Sorry we could find this email in our system'});
        }
    
        let token = UtilService.generateRandomToken();
    
        await UserModel.update({
          _id: user._id
        }, {
          forgotPasswordToken: token
        });
    
        let htmlTemplate = htmlTemplateService.ForgotPassword(user, token);
        UtilService.sendEmail(user.email, 'Renew Password', htmlTemplate)
    
        res.send({success: true, message: 'An email has been sent to your account.'});
    
    
      } catch (error) {
        return res.send({success: false, message: error});
      }
}

exports.resetPassword = async function(req, res){
    try {
        //console.log(req.params.forgotPasswordToken, req.body.params);
        let user = await UserModel.findOne({
            forgotPasswordToken: req.params.forgotPasswordToken
        });

        if (!user) {
            return res.send({success: false, message:
            'Sorry we could find this user in our system'});
        }

        user.password = req.body.password;
        user.forgotPasswordToken = null

        await user.save();

        res.send({success: true, message: 'Your password has been resetted successfully.'});


    } catch (error) {
        return res.send({success: false, message: error});
    }
}

exports.activateAccount = async function(req, res){
    try {
        //console.log(req.params.token);
        let user = await UserModel.findOne({
            "accountActivated.token": req.params.token
        });

        if (!user) {
            return res.send({success: false, message:
            'Sorry we could find this user in our system'});
        }

        user.accountActivated.isTrue = true;
        user.accountActivated.token = null;
        if(user.role == 'user'){
            let patient = new PatientModel();
            patient.user = user._id;
            await patient.save();
        }else if(user.role == 'nurse'){
            let nurse = new NurseModel();
            nurse.user = user._id
            await nurse.save()
        }else if(user.role == 'doctor'){
            let doctor = new DoctorModel();
            doctor.user = user._id
            await doctor.save();
        }

        await user.save();

        res.send({success: true, message: 'Your account has been activated successfully'});


    } catch (error) {
        return res.send({success: false, message: error});
    }
}

exports.delete = async function(req, res) {
    try{
        await UserModel.remove({_id:req.body.id}).then(()=>{
            res.send({
                success: true,
                message: "User removed"
            })
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
};

exports.getUserById = async function (req, res){
    try{
        await UserModel.findById(req.params.userId).exec((err, doc)=>{
            doc.accountActivated.token = null
            doc.points = null
            doc.profileApproved = null
            doc.forgotPasswordToken = null
            doc.salt = null
            doc.hashedPassword = null
            doc.phone = null
            
            //TODO: Need re evalutaion after pose module
            if(err){
                res.send({
                    success: false,
                    message: err
                })
            }
            res.send({
                success: true,
                user: doc
            })
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.createUser = async function (req, res){
    try{
        req.body.role = "user";
        req.body.profileApproved = true;
        req.body.terms = true;
        await UserModel.create(req.body).exec((err, doc)=>{
            //TODO: Need re evalutaion after pose module
            if(err){
                res.send({
                    success: false,
                    message: err
                })
            }
            res.send({
                success: true,
                user: doc
            })
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.createUserAdmin = async function (req, res){
    try{ 
        await UserModel.create(req.body).exec((err, doc)=>{
            //TODO: Need re evalutaion after pose module
            if(err){
                res.send({
                    success: false,
                    message: err
                })
            }
            res.send({
                success: true,
                user: doc
            })
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}
