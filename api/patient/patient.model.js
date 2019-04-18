'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PatientSchema = new Schema({
    user: String,
    doctor:String,
    diagnosis:[String],
    address:String,
    bloodtype:String,
    createdt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', PatientSchema);