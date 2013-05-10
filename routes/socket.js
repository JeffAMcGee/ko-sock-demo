(function(){
"use strict";

var ko = require('knockout');
var models = require('../models');


var game = new models.GameModel();

module.exports = function (socket) {
  socket.emit('startup', game.toJS());
  socket.on('move', function (data) {
    var piece = game.pieces()[data.id];
    if(piece.isValidMove(data.location)) {
      piece.location(data.location);
      socket.broadcast.emit('move', data);
      socket.emit('move', data);
    } else {
      console.error('invalid move');
    }
  });
};

})();
