var mongo = require('../mongo');
var models = require('../models');

exports.play = function(req, res){
  mongo.game.findOne({a:3}, function(err, item) {
    var game = new models.GameModel();
    res.send( { title: game.players[0](), a: item.a } );
  });
};
