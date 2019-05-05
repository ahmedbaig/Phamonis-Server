'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PiSchema = new Schema({
    model: String, 
    serial_number:String,
    status: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('PiSchema', PiSchema);