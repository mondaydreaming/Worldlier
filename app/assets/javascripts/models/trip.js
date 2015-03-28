var app = app || {};

// Create model 
app.Trip = Backbone.Model.extend({
  urlRoot: '/trips',
  defaults: {
    sightsnum: 5, 
    location: 'London',
    location_radius: 50,
    tag: 'Historical'
    // user_id: '' - are associations required?
  }
});