'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PiSchema = new Schema({
    model: String, 
    serial_number:String,
    route_ip: String,
    status: {
        type: Boolean,
        default: false
    },
    user: {
        type: String,
        default: ""
    },
    active: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Pi', PiSchema);