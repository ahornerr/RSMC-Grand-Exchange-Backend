#!/usr/bin/env node
//var debug = require('debug')('Backend');
//var app = require('../app');
//
//app.set('port', process.env.PORT || 3000);
//
//var server = app.listen(app.get('port'), function() {
//  debug('Express server listening on port ' + server.address().port);
//});

var port = 3000;
var express = require('express'),
    items = require('./routes/items'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://localhost/rsmc_ge_database');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/items', items.findAll);
app.get('/items/:id', items.findById);
app.post('/items', items.addItem);
app.put('/items/:id', items.updateItem);

app.listen(port);
console.log("RSMC GE backend listening on port %d", port);