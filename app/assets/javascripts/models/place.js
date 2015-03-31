var app = app || {};

app.Place = Backbone.Model.extend({
  urlRoot: function() { return'/trips/' + this.tripID +'/places'},
  defaults: {
    //Enter any default values you want
  }
});