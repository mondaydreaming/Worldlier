// Initiate a new object for all elements going forward
var app = app || {};

app.trips = new app.Trips();

$(document).ready(function(){
  // On pages where there is no main div, return nothing
  if ($('#main').length === 0) {
    return;
  };

  // Replace <%= erb style %> with {{ Handlebars style }}
  // to prevent a conflict with Rails views.
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };
  app.trips.fetch().done(function(){
    app.appRouter = new app.AppRouter();
    Backbone.history.start();
  })
})
