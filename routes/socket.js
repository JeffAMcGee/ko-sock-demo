var models = require('../models');


var game = new models.GameModel();

module.exports = function (socket) {
  socket.emit('startup', { loc: game.pieces()[0].location() });
  socket.on('move', function (data) {
    game.pieces()[0].location(data.loc);
    socket.broadcast.emit('move', data);
    socket.emit('move', data);
  });
};

