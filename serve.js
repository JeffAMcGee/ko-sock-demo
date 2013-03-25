#!/usr/bin/env node

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');


// Configuration
var app = module.exports = express();
app.enable('trust proxy');
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  // static is a reserved keyword, and jshint complains
  app.use(express['static'](__dirname + '/static'));

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
app.get('/', routes.index);


// Start it up!
app.listen(8000, function(){
  console.log('Listening on http://localhost:8000/ from pid '+process.pid);
});
