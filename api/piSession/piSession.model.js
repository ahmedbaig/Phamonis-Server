'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PiSessionSchema = new Schema({
    pi: {
        type: String,
        default: '',
        required: true
    },
    routeIp: {
        type: String,
        default: ""
    },
    lastUsed: {
        type: Date,
        default: Date.now()
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('PiSession', PiSessionSchema);