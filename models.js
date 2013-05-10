(function(){
"use strict";

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
  var proto = {
    players:["black","white"],
    pieces:[{location:[0,0]},{location:[7,0]}]
  };
  _.extend(proto, data);

  // properties
  this.pieces = ko.observableArray(_.map(proto.pieces,PieceModel));
  this.players = ko.observableArray(proto.players);

  // serialization
  this.toJS = function() {
    var pieces = _.map(this.pieces(),function(piece) {return piece.toJS();});
    return {players:this.players(), pieces:pieces};
  };
};


var PieceModel = function(data) {
  // construction
  if ( !(this instanceof PieceModel) ) {
    return new PieceModel(data);
  }
  var proto = {
    location:[0,0],
    owner:"black"
  };
  _.extend(proto, data);

  // properties
  this.owner = ko.observable(proto.owner);
  this.location = ko.observable(proto.location);

  // serialization
  this.toJS = function() {
    return {owner:this.owner(),location:this.location()};
  };

  // computed properties
  this.x = ko.computed(function() {
    return this.location()[0]*CELL_SIZE+LEFT_ROOK_OFFSET;
  },this);

  this.y = ko.computed(function() {
    return this.location()[1]*CELL_SIZE+TOP_ROOK_OFFSET;
  },this);

  this.locFromTopLeft = function(top,left) {
    return [Math.round((left-LEFT_ROOK_OFFSET)/CELL_SIZE),
            Math.round((top-TOP_ROOK_OFFSET)/CELL_SIZE)];
  };

  this.isValidMove = function(move) {
    // check that move is a valid move for a rook.
    var loc = this.location();
    if( move[0]<0 || move[0]>=BOARD_SIZE || move[1]<0 || move[1]>=BOARD_SIZE ) {
      return false;
    }
    var vert = (loc[0]===move[0] && loc[1]!==move[1]);
    var horz = (loc[0]!==move[0] && loc[1]===move[1]);
    return vert || horz;
  };
};


module.exports = {
  GameModel:GameModel,
  PieceModel:PieceModel
};

})();
