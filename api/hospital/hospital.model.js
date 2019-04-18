'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var HospitalSchema = new Schema({
    name:String,
    phone:String,
    address:String,
    createdt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hospital', HospitalSchema);