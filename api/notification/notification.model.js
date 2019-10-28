'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NotificationSchema = new Schema({
    user: String,
    message: String,
    link: String,
    read: {type: Boolean, default: false},
    published: String,
    createdt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);