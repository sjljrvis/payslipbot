const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
const fs = require('fs')
const os = require('os')
const expressjwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
var config = require('./config')

var app = express();

app.use(cors());
app.use(cookieParser('LOL-my-Secret-dam'));
app.use(bodyparser.json())
app.use(bodyparser({ urlencoded: true }))
app.use(express.static(__dirname + '/public', { maxage: '7d' }));



var port = config.port
app.jwt = jwt;
app.expressjwt = expressjwt;
app.config = config;

global.__base = __dirname;


app.db = mongoose.createConnection(config.mongodb.uri);
app.db.on('error', console.error.bind(console, 'mongoose connection error: '));

app.db.once('open', function () {
	console.log(config.mongodb.uri);
});

mongoose.Promise = Promise

import { models } from './models';
models(app, mongoose);

import { indexRoute } from './app/routes';
indexRoute(app);

import {slack} from './app/controllers/slack'
slack(app);


app.listen(port, () => {
	console.log('server running on :' + port)
})




