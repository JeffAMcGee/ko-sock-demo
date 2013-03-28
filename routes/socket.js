var models = require('../models');


var game = new models.GameModel();

module.exports = function (socket) {
  var piece = game.pieces()[0];
  socket.emit('startup', { loc: piece.location() });
  socket.on('move', function (data) {
    if(piece.isValidMove(data.loc)) {
      piece.location(data.loc);
      socket.broadcast.emit('move', data);
      socket.emit('move', data);
    } else {
      console.log('invalid move');
    }
  });
};

