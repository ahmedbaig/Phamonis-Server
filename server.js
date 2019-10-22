'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const busboyBodyParser = require('busboy-body-parser');
const path = require('path');
var cron = require('node-cron');

const _ = require('lodash');
const moment = require('moment');

const PiModel = require('./api/pi/pi.model')

const app = express(); 

const PORT = process.env.PORT || 4040;


// mongoose.connect('mongodb://localhost/gramie_player');
let url = 'mongodb://phamonisTeam:abc123@ds046027.mlab.com:46027/phamonis'
mongoose.connect(url, (err,db)=>{
  if(err) { 
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
  res.setHeader('Access-Control-Allow-Headers', "access-control-allow-headers,access-control-allow-origin,content-type");

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
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

app.get('/dist-image/:filename', function(req, res){
  var filename = req.params.filename.replace(/'/g, '');
  res.sendFile(path.resolve('./dist/App/assets/images/' + filename));
})

app.get('/dist-user-images/:filename', function(req, res) {
  var filename = req.params.filename.replace(/'/g, '');
  res.sendFile(path.resolve('./dist/App/assets/images/user/' + filename));
});

app.get('/dist-user-qualification/:filename', function(req, res) {
  var filename = req.params.filename.replace(/'/g, '');
  res.sendFile(path.resolve('./dist/App/assets/images/user/qualification' + filWename));
});

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 
cron.schedule('*/10 * * * *', async () => {
  console.log('Reset all devices status...');
  await PiModel.updateMany({}, {status: false})
});


require('./routes')(app);

app.listen(PORT, function() {
  console.log('Server listening on PORT : ' + PORT);
})
