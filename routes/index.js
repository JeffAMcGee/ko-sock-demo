var ko = require('knockout');


var ViewModel = function(first, last) {
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);
    this.fullName = ko.computed(function() {
        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        return this.firstName() + " " + this.lastName();
    }, this);
};

exports.index = function(req, res){
  var thing = new ViewModel("Planet", "Earth");
  res.send( { title: thing.firstName() } );
};
