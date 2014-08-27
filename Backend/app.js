#!/usr/bin/env node
 //var debug = require('debug')('Backend');
//var app = require('../app');
//
//app.set('port', process.env.PORT || 3000);
//
//var server = app.listen(app.get('port'), function() {
//  debug('Express server listening on port ' + server.address().port);
//});

var port = 2403;
var app = require('express.io')(),
  items = require('./routes/items'),
  exphbs = require('express3-handlebars'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

app.http().io();
mongoose.connect('mongodb://localhost/rsmc_ge_database');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/items', items.findAll);
app.get('/items/:id', items.findById);
app.post('/items', items.addItem);
app.put('/items/:id', items.updateItem);

app.listen(port);
console.log("RSMC GE backend listening on port %d", port);



app.io.on('connection', function(socket) {
  console.log('a user connected');
  socket.emit('connectionEvent', {
    dick: 'butts',
    jaden: 'chris'
  });
});