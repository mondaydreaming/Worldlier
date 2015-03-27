var app = app || {};

app.AppRouter = Backbone.Router.extend ({
  routes: {
    '' : 'index',
    '/trips' : 'viewTripsList',
    '/trips/:id' : 'viewTrip',
    '/places/:id' : 'viewPlace'
  },

  index :function() {
    //render the search page
  },

  viewTripsList :function() {
    var appView = new app.AppView({collection: app.userTrips});
    appView.render();
  },

  viewTrip :function() {
    var trip = app.userTrips.get(id);
    var tripView = new app.TripView({model: trip});
    tripView.render();
  },

  viewPlace :function() {
    //render the place view
  }

})