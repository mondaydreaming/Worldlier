var app = app || {};

app.Trips = Backbone.Collection.extend({
  url: '/trips',
  model: app.Trip
});