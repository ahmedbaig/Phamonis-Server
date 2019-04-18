'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var QualificationSchema = new Schema({
    user:String,
    degree:String,
    grade:String,
    institute:String,
    path:String,
    createdt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Qualification', QualificationSchema);