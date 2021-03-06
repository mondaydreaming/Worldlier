var app = app || {};

app.AppRouter = Backbone.Router.extend ({
  routes: {
    '' : 'viewSearchPage',
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

  viewTripsList :function() {
    var trips = app.trips
    var tripListView = new app.TripListView({collection: trips})
    tripListView.render()
  },

  viewTrip :function(id) {
    var trip = app.trips.get(id);
    var tripView = new app.TripView({model: trip});
    tripView.render();
  },

  viewPlace :function(id) {
    console.log('viewing the place page')
    var place = app.places.get(id);
    var placeView = new app.PlaceView({model: place});
    placeView.render();
  }
})