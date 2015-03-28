var app = app || {};

app.Places = Backbone.Collection.extend({
  url: '/places',
  model: app.Place
})