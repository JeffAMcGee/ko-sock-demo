var ko = require('knockout');
var CELL_SIZE = 50;
var BOARD_SIZE = 8;
var TOP_ROOK_OFFSET = 14;
var LEFT_ROOK_OFFSET = 7;

exports.GameModel = function() {
  var self = this;
  self.gameBoard = ko.observable(new exports.BoardModel());
  self.playerBoards = ko.observableArray([]);
  //self.pieces = ko.observableArray([self.gameBoard]);
  self.pieces = ko.observableArray([new exports.PieceModel()]);
  self.players = ko.observableArray(["black","white"]);
};

exports.PieceModel = function() {
  var self = this;
  self.id = -1;
  self.owner = ko.observable(null);
  self.location = ko.observable([3,4]);
  self.parent = ko.observable(null);

  self.x = ko.computed(function() {
    return self.location()[0]*CELL_SIZE+LEFT_ROOK_OFFSET;
  },this);
  self.y = ko.computed(function() {
    return self.location()[1]*CELL_SIZE+TOP_ROOK_OFFSET;
  },this);
  self.locFromTopLeft = function(top,left) {
    return [Math.round((left-LEFT_ROOK_OFFSET)/CELL_SIZE),
            Math.round((top-TOP_ROOK_OFFSET)/CELL_SIZE)];
  };

  self.validMoves = ko.computed(function() {
    var moves = [];
    var loc = self.location();
    for (var i=0;i<BOARD_SIZE;i++) {
      if(i!=loc[0]){
        moves.push([i,loc[1]]);
      }
    }
    for (var j=0;j<BOARD_SIZE;j++) {
      if(j!=loc[1]){
        moves.push([loc[0],j]);
      }
    }
    return moves;
  },this);
};



exports.BoardModel = function() {
  var self = this;
  self.id = -1;
  self.owner = ko.observable(null);
};
