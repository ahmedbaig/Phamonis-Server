'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NurseSchema = new Schema({
    user:String,
    patients:[String],
    hospital:String,    
    qualification:[String],
    createdt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Nurse', NurseSchema);