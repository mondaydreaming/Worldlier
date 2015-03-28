var app = app || {};

app.AppRouter = Backbone.Router.extend ({
  routes: {
    '' : 'index',
    'search': 'viewSearchPage',
    'trips' : 'viewTripsList',
    'trips/:id' : 'viewTrip',
    'places/:id' : 'viewPlace'
  },

  viewSearchPage : function() {
    console.log('viewing search page')
    var searchView = new app.SearchView();
    searchView.render()
  },

  // viewTripsList :function() {
  //   var appView = new app.AppView({collection: app.trips});
  //   appView.render()
  // },

  // viewTrip :function() {
  //   var trip = app.userTrips.get(id);
  //   var tripView = new app.TripView({model: trip});
  //   tripView.render();
  // },

  // viewPlace :function() {
  //   //render the place view
  // }

})