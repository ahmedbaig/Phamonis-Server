'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EmergencySchema = new Schema({
    user: String,
    pi: String,
    comments: String,
    read: {
        type: Boolean,
        default: false
    },
    createdt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Emergency', EmergencySchema);