'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSessionSchema = new Schema({
    user: {
        type:String,
        default: '',
        required: true
    },
    isDeleted: {
        type:Boolean,
        default: false
    },
    geoLocationData: Object,
    lastUsed: {
        type:Date,
        default: Date.now()
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('UserSession', UserSessionSchema);