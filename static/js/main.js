
var socket = io.connect('http://localhost:8000');
socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});

// Here's my data model
var ViewModel = function(first, last) {
  this.firstName = ko.observable(first);
  this.lastName = ko.observable(last);
  this.fullName = ko.computed(function() {
    return this.firstName() + " " + this.lastName();
  }, this);
};


ko.applyBindings(new ViewModel("Planet", "Earth"));
