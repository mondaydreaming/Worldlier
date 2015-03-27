// Initiate a new object for all elements going forward
var app = app || {};

app.userTrips = new app.Trips();

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

  app.userTrips.fetch().done(function(){
    app.appRouter = new app.AppRouter();
    Backbone.history.start();
  });












})



// var ready = function() {

// }


// $(document).ready(ready);
// $(document).on('page:load', ready);
