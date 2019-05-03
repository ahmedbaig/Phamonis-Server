'use strict';
var compose = require('composable-middleware');
const UserSession  = require('../api/userSession/userSession.model')
const UserModel = require("../api/user/user.model")

function isAuthenticated() {
    return compose()
        // Attach user to request
        .use(async function(req, res, next) {
            await UserSession.findById(req.params.token).exec(async (err, session)=>{
                if(err){
                    res.send({
                        success: false,
                        message: "Invalid token"
                    })
                }
                if(session.isDeleted == false){
                    await UserModel.findById(session.user).exec((err, user)=>{
                        if(err){
                            res.send({
                                success: false,
                                message: err.message
                            })
                        }
                        if(user.accountActivated.isTrue==false){
                            res.send({
                                success: false,
                                message: "Account not activated via email."
                            })
                        }
                        if(user.profileApproved == false){
                            res.send({
                                success: false,
                                message: "Account not approved by a supervisor."
                            })
                        }
                        next();
                    })
                }else{
                    res.send({
                        success: false,
                        message: "Authorization error!"
                    })
                }
            })
        });
}

/**
 * Attaches the user object to the request if authenticated and for PI micro controller
 * Otherwise returns 403
 */
function isPiAuthenticated() {
    return compose()
        // Attach user to request
        .use(function(req, res, next) {
            
        });
}

/**
 * Attaches the user object to the request if authenticated and for Nurses
 * Otherwise returns 403
 */
function isStaff() {
    return compose()
        // Attach user to request
        .use(async function(req, res, next) {
            await UserSession.findById(req.params.token).exec(async (err, session)=>{
                if(err){
                    res.send({
                        success: false,
                        message: "Invalid token"
                    })
                }
                if(session.isDeleted == false){
                    await UserModel.findById(session.user).exec((err, user)=>{
                        if(err){
                            res.send({
                                success: false,
                                message: err.message
                            })
                        }
                        if(user.accountActivated.isTrue==false){
                            res.send({
                                success: false,
                                message: "Account not activated via email."
                            })
                        }
                        if(user.profileApproved == false){
                            res.send({
                                success: false,
                                message: "Account not approved by a supervisor."
                            })
                        }
                        if(user.role == 'nurse'){
                            next();
                        }else{
                            res.send({
                                success: false,
                                message: "Your account does not have required level access"
                            })
                        }
                    })
                }else{
                    res.send({
                        success: false,
                        message: "Authorization error!"
                    })
                }
            })
        });
}

/**
 * Attaches the user object to the request if authenticated and an admin level user
 * Otherwise returns 403
 */
function isAdmin() {
    return compose()
        // Attach user to request
        .use(async function(req, res, next) {
            await UserSession.findById(req.params.token).exec(async (err, session)=>{
                if(err){
                    res.send({
                        success: false,
                        message: "Invalid token"
                    })
                }
                if(session.isDeleted == false){
                    await UserModel.findById(session.user).exec((err, user)=>{
                        if(err){
                            res.send({
                                success: false,
                                message: err.message
                            })
                        }
                        if(user.accountActivated.isTrue==false){
                            res.send({
                                success: false,
                                message: "Account not activated via email."
                            })
                        }
                        if(user.profileApproved == false){
                            res.send({
                                success: false,
                                message: "Account not approved by a supervisor."
                            })
                        }
                        if(user.role == 'admin'){
                            next();
                        }else{
                            res.send({
                                success: false,
                                message: "Your account does not have superuser level access"
                            })
                        }
                    })
                }else{
                    res.send({
                        success: false,
                        message: "Authorization error!"
                    })
                }
            })
        });
}

exports.isAuthenticated = isAuthenticated;
exports.isPiAuthenticated = isPiAuthenticated;
exports.isAdmin = isAdmin;
exports.isStaff = isStaff;
