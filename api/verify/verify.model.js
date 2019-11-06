'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VerificationSchema = new Schema({
    user: String,
    sid: String,
    to: String,
    code: String,
    channel: String,
    status: String,
    valid: Boolean,
    createdt: {
        type: Date,
        default: Date.now
    },
    updatedt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Verification', VerificationSchema);