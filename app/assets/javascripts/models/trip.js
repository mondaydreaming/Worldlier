var app = app || {};

// Create model 
app.Trip = Backbone.Model.extend({
  urlRoot: '/trips',
  defaults: {
  }
});