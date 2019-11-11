'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const busboyBodyParser = require('busboy-body-parser');
const path = require('path');
const spdy = require('spdy')
const fs = require('fs')
const cron = require('node-cron');
const request = require('request');
const _ = require('lodash');
const moment = require('moment');

const PiModel = require('./api/pi/pi.model')
const UserModel = require('./api/user/user.model')

const app = express();

const PORT = process.env.PORT || 4040;

const options = {
    key: fs.readFileSync(__dirname + '/server.key'),
    cert: fs.readFileSync(__dirname + '/server.cert')
}

// mongoose.connect('mongodb://localhost/gramie_player');
let url = 'mongodb://phamonisTeam:abc123@ds046027.mlab.com:46027/phamonis'
mongoose.connect(url, (err, db) => {
        if (err) {
            throw err
        } else {
            console.log('Successfully connected to MongoDB')
        }
    })
    //mongoose.connect('mongodb://localhost/union_prod');
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', "access-control-allow-headers,access-control-allow-origin,content-type,authorization_token,service_id");

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
        next();
    } else {
        next();
    }
});

app.use(express.static(path.join(__dirname, 'dist/App/')));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(busboyBodyParser());

app.use('/auth', require('./auth'))

app.get('/dist-image/:filename', function(req, res) {
    var filename = req.params.filename.replace(/'/g, '');
    res.sendFile(path.resolve('./dist/App/assets/images/' + filename));
})

app.get('/dist-pose/:folder/:filename', function(req, res) {
    var filename = req.params.filename.replace(/'/g, '');
    var folder = req.params.folder.replace(/'/g, '');
    res.sendFile(path.resolve(`./dist/App/assets/images/pose/${folder}/${filename}`));
})

app.get('/dist-user-images/:filename', function(req, res) {
    var filename = req.params.filename.replace(/'/g, '');
    res.sendFile(path.resolve('./dist/App/assets/images/user/' + filename));
});

app.get('/dist-user-qualification/:filename', function(req, res) {
    var filename = req.params.filename.replace(/'/g, '');
    res.sendFile(path.resolve('./dist/App/assets/images/user/qualification' + filename));
});

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

cron.schedule('*/1 * * * *', async() => {
    console.log('Reset user codes...');
    await UserModel.find({}, async(err, allusers) => {
        await Promise.all(_.map(allusers, async user => {
            await UserModel.update({ _id: user._id }, { code: { code: Math.floor(100000 + Math.random() * 900000), timeStamp: moment(new Date) } })
        }))
    })
})

cron.schedule('*/10 * * * *', async() => {
    console.log('Reset all devices status...');
    await PiModel.updateMany({}, { status: false }, async(err, raw) => {
        await PiModel.find({}, async(err, pis) => {
            await Promise.all(_.map(pis, pi => {
                if (pi.active == true && pi.route_ip != null) {
                    request(`http://${pi.route_ip}:5000/alive`, async function(error, response, body) {
                        if (response) {
                            // console.log('statusCode:', response); // Print the response status code if a response was received
                            // console.log('body:', body); // Print the HTML for the Google homepage.
                            // console.log('success:', body); // Print the HTML for the Google homepage
                            if (JSON.parse(body).success == 1) {
                                console.log("Active PI");
                                await PiModel.update({ serial_number: JSON.parse(body).serial_number }, { status: true }, (err, update) => {
                                    console.log(`PI: ${JSON.parse(body).serial_number} status is alive`)
                                })
                            }
                        } else {
                            console.log('Cannot reach:', error.address); // Print the error if one occurred
                        }
                    });
                }
            }))
        })
    })
});


require('./routes')(app);

// app.listen(PORT, function() {
//   console.log('Server listening on PORT : ' + PORT);
// })

spdy
    .createServer(options, app)
    .listen(PORT, (error) => {
        if (error) {
            console.error(error)
            return process.exit(1)
        } else {
            console.log('Listening on port: ' + PORT + '.')
        }
    })