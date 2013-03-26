var ko = require('knockout');
//var _ = require('underscore');
var io = require('socket.io-client');
var socket = io.connect('http://localhost:8000');
var models = require('../../models');


socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});

var game = new models.GameModel();

setInterval(function() {
  var piece = game.pieces()[0];
  var moves = piece.validMoves();
  var move = moves[Math.floor(Math.random()*moves.length)];
  console.log(move);
  piece.location(move);
},1000);

ko.applyBindings(game);
