'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DoctorSchema = new Schema({
    user: String,
    position:String,
    services:[String],
    qualificatin:[String],
    hospital:String,
    patients:[String],
    createdt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Doctor', DoctorSchema);