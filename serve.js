#!/usr/bin/env node
(function(){
"use strict";

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var socket = require('./routes/socket.js');
var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var browserify = require('browserify');
var fs = require('fs');


// bundle javascript for client
var browserFiles = browserify(['./static/js/main.js']);
var bundle = browserFiles.bundle({});
bundle.pipe(fs.createWriteStream('./static/js/bundle.js'));


// Configuration
app.enable('trust proxy');
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/static'));

  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'Something broke!');
  });
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


// Routes
app.get('/api/greet', routes.greet);
io.sockets.on('connection', socket);


// Start it up!
server.listen(8000, function(){
  console.log('Listening on http://localhost:8000/');
});

})();
