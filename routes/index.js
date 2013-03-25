var ko = require('knockout');
var mongo = require('../mongo');
var models = require('../models');

exports.play = function(req, res){
  //mongo.game.insert({a:3}, function(err, docs) {
  //});
  mongo.game.findOne({a:3}, function(err, item) {
    var thing = new models.ViewModel("Planet", "Earth");
    res.send( { title: thing.firstName(), a: item.a } );
  });
};
