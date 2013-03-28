var ko = require('knockout');
var _ = require('underscore');
var io = require('socket.io-client');
var socket = io.connect('http://localhost:8000');
var models = require('../../models');


var game = new models.GameModel();

socket.on('startup', function (data) {
  game.pieces()[0].location(data.loc);
});

socket.on('move', function (data) {
  game.pieces()[0].location(data.loc);
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
            var equalsLoc = function(loc2) {return loc2[0]==loc[0]&&loc2[1]==loc[1];};
            if(_.any(piece.validMoves(),equalsLoc)) {
              socket.emit('move', { loc: loc });
            }
          }
        });
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {}
};

ko.applyBindings(game);

