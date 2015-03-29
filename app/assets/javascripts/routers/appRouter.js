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

  viewTripsList :function() {
    console.log('viewTripsList function is being called')
    var trips = app.trips
    var tripListView = new app.TripListView({collection: trips})
    tripListView.render()

    // app.trips.fetch().done(function(id){
    //   var trip = app.trips.get(id)
    //   var tripListView = new app.TripListView({model: trip});
    //   tripListView.render();
    // })
    // var appView = new app.AppView({collection: app.trips});
    // appView.render()
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