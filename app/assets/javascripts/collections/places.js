var app = app || {};

app.Places = Backbone.Collection.extend({
  url: function() { return'/trips/' + this.tripID +'/places'},
  model: app.Place,
  initialize: function (options) {
    this.tripID = options.trip_id;
  }
})