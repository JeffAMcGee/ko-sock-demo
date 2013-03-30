var ko = require('knockout');
//var _ = require('underscore');
var io = require('socket.io-client');
var socket = io.connect('http://localhost:8000');
var models = require('../../models');


var game = null;

socket.on('startup', function (data) {
  game = new models.GameModel(data);
  // TODO: show pretty spinner while waiting
  // FIXME: applyBindings can get called twice if the server restarts. That's bad.
  ko.applyBindings(game);
});

socket.on('move', function (data) {
  game.pieces()[data.id].location(data.location);
});


ko.bindingHandlers.draggablePiece = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        $(element).draggable({
          revert:true,
          opacity: 0.4,
          helper: "clone",
          revertDuration: 0,
          stop: function(event,ui) {
            var piece = viewModel;
            var loc = piece.locFromTopLeft(ui.position.top,ui.position.left);
            if(piece.isValidMove(loc)) {
              socket.emit('move', { id: bindingContext.$index(), location: loc });
            }
          }
        });
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {}
};

