'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ConnectionsSchema = new Schema({
    cid: String,
    user: String,
    full_name: String,
    login: String,
    email: String,
    password: { type: String, default: "phamonisChat123" }
});

// UserSchema.plugin(deepPopulate);

module.exports = mongoose.model('Chat', ConnectionsSchema);