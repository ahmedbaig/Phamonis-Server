'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ScheduleSchema = new Schema({ 
    user:String,
    creatorId: String,   
    description: String,
    location: String,
    subject: String,
    calendar: String,
    start: String,
    end: String,
    createdt:{
        type: Date,
        default: Date.now
    },
    updatedt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);