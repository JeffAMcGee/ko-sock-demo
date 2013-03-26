var ko = require('knockout');
//var _ = require('underscore');
var io = require('socket.io-client');
var socket = io.connect('http://localhost:8000');
var models = require('../../models');


socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});


ko.applyBindings(new models.GameModel());
