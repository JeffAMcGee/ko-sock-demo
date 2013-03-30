var ko = require('knockout');
var _ = require('underscore');


var CELL_SIZE = 50;
var BOARD_SIZE = 8;
var TOP_ROOK_OFFSET = 14;
var LEFT_ROOK_OFFSET = 7;


var GameModel = function(data) {
  // construction
  if ( !(this instanceof GameModel) ) {
    return new GameModel(data);
  }
  var self = this;
  var proto = {
    players:["black","white"],
    pieces:[{location:[0,0]},{location:[7,0]}]
  };
  _.extend(proto, data);

  // properties
  self.pieces = ko.observableArray(_.map(proto.pieces,PieceModel));
  self.players = ko.observableArray(proto.players);

  // serialization
  self.toJS = function() {
    var pieces = _.map(self.pieces(),function(piece) {return piece.toJS();});
    return {players:self.players(), pieces:pieces};
  };
};


var PieceModel = function(data) {
  // construction
  if ( !(this instanceof PieceModel) ) {
    return new PieceModel(data);
  }
  var self = this;
  var proto = {
    location:[0,0],
    owner:"black"
  };
  _.extend(proto, data);

  // properties
  self.owner = ko.observable(proto.owner);
  self.location = ko.observable(proto.location);

  // serialization
  self.toJS = function() {
    return {owner:self.owner(),location:self.location()};
  };

  // computed properties
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

  self.isValidMove = function(newLoc) {
    return _.any(
      self.validMoves(),
      function(move) {return move[0]==newLoc[0]&&move[1]==newLoc[1];}
    );
  };
};


module.exports = {
  GameModel:GameModel,
  PieceModel:PieceModel
};
