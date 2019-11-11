'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ConnectionsSchema = new Schema({
    connection: {
        type: String,
        default: ""
    },
    user: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        default: false
    },
    declined: {
        type: Boolean,
        default: false
    }
});

// UserSchema.plugin(deepPopulate);

module.exports = mongoose.model('Connections', ConnectionsSchema);