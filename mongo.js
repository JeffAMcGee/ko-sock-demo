var MongoClient = require('mongodb').MongoClient;

var mongo = module.exports = {};

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

