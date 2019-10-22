'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DiagnosisSchema = new Schema({
    doctor: String,
    symptom:String,
    report:String,
    prescription:String,
    hospital:String,
    patients:[String],
    createdt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Doctor', DoctorSchema);