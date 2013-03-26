var ko = require('knockout');


exports.GameModel = function() {
  var self = this;
  self.gameBoard = ko.observable(new exports.BoardModel());
  self.playerBoards = ko.observableArray([]);
  self.pieces = ko.observableArray([self.gameBoard]);
  self.players = ko.observableArray(["black","white"]);
};

exports.PieceModel = function() {
  var self = this;
  self.id = -1;
  self.owner = ko.observable(null);
  self.location = ko.observable([0,0]);
  self.parent = ko.observable(null);
};

exports.BoardModel = function() {
  var self = this;
  self.id = -1;
  self.owner = ko.observable(null);
};
