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

  // computed properties
  self.x = ko.computed(function() {
    return self.location()[0]*CELL_SIZE+LEFT_ROOK_OFFSET;
  },this);

  self.y = ko.computed(function() {
    return self.location()[1]*CELL_SIZE+TOP_ROOK_OFFSET;
  },this);
};

PieceModel.prototype.toJS = function() {
  return {owner:this.owner(),location:this.location()};
};

PieceModel.prototype.locFromTopLeft = function(top,left) {
  return [Math.round((left-LEFT_ROOK_OFFSET)/CELL_SIZE),
          Math.round((top-TOP_ROOK_OFFSET)/CELL_SIZE)];
};

PieceModel.prototype.isValidMove = function(move) {
  // check that move is a valid move for a rook.
  var loc = this.location();
  if( move[0]<0 || move[0]>=BOARD_SIZE || move[1]<0 || move[1]>=BOARD_SIZE ) {
    return false;
  }
  var vert = (loc[0]===move[0] && loc[1]!==move[1]);
  var horz = (loc[0]!==move[0] && loc[1]===move[1]);
  return vert || horz;
};


module.exports = {
  GameModel:GameModel,
  PieceModel:PieceModel
};
