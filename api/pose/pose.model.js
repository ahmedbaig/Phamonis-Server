'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PoseSchema = new Schema({    
    pi: {
        type:String,
        default: '',
        required: true
    },
    user: {
        type:String,
        default: '',
        required: true
    }, 
    item: String,
    isDeleted: {
        type:Boolean,
        default: false
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('pose', PoseSchema);