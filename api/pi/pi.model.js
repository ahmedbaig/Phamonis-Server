'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PiSchema = new Schema({
    model: String,
    serial_number: String,
    route_ip: { type: String, default: null },
    session_token: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: false
    },
    threshold: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        default: ""
    },
    active: {
        type: Boolean,
        default: false
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Pi', PiSchema);