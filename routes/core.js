var ko = require('knockout');
var MongoClient = require('mongodb').MongoClient;

var mongo = {};

// Connect to the db
MongoClient.connect(
  "mongodb://localhost:27017/bayou",
  function(err, db) {
    if(err) {
      console.error("error connecting to mongodb");
    } else {
      mongo.game = db.collection('game');
      mongo.gameLog = db.collection('gameLog');
    }
  }
);


var ViewModel = function(first, last) {
  var self = this;
  self.firstName = ko.observable(first);
  self.lastName = ko.observable(last);
  self.fullName = ko.computed(function() {
    return self.firstName() + " " + self.lastName();
  }, this);
};

exports.index = function(req, res){
  //mongo.game.insert({a:3}, function(err, docs) {
  //});
  mongo.game.findOne({a:3}, function(err, item) {
    var thing = new ViewModel("Planet", "Earth");
    res.send( { title: thing.firstName(), a: item.a } );
  });
};
