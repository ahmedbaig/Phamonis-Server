'use strict';


var path = require('path');

module.exports = function(app) {

    // ANALYTICS USAGE

    app.use('/api/user', require('./api/user'));
    app.use('/api/userSession', require('./api/userSession'));
    app.use('/api/piSession', require('./api/piSession'));
    app.use('/api/notification', require('./api/notification'));
    app.use('/api/hospital', require('./api/hospital'));
    app.use('/api/pi', require('./api/pi'));
    app.use('/api/pose', require('./api/pose'));
    app.use('/api/emergency', require('./api/emergencyRequests'));
    app.use('/api/stats', require('./api/stats'));
    app.use('/api/verify', require('./api/verify'));
    app.use('/api/connections', require('./api/connections'));
    app.use('/api/chat', require('./api/chat'));
    // app.use('/api/discussion', require('./api/discussionBoard'));
    // app.use('/api/schedule', require('./api/scheduleManager'));
    // app.use('/api/diagnosis', require('./api/diagnosis'));
    // app.use('/api/card', require('./api/card'));
    // app.use('/api/transaction', require('./api/transaction'));
    // app.use('/api/dispute', require('./api/dispute'));

    app.route('/*')
        .get(function(req, res) {
            // Commented path is for angular 6 build post production
            res.sendFile(path.resolve(__dirname + '/dist/App/index.html'));
            // res.sendFile(path.resolve( __dirname + '/index.html'));
        });

}