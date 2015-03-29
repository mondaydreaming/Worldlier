var app = app || {};

app.SearchView = Backbone.View.extend({
  el: '#main',
  events: {
    'click .search': 'searchTrip'
  },
  render: function() {
    console.log('rendering search html')
    var html = $('#searchTemplate').html();
    this.$el.html(html);
  },

  searchTrip: function(event){
    event.preventDefault();
    var location = this.$('#location').val();
    var radius = this.$('#radius').val();
    var placeTag = this.$('#place_tag').val();
    var numberSights = this.$('#number_sights').val();
    var saveTrip = new app.Trip ({
      sightsnum: numberSights,
      location: location,
      location_radius: radius,
      tag: placeTag,
    });
    saveTrip.save().done(function(trip){
      app.trips.add(saveTrip);
      app.appRouter.navigate('/trips/' + trip.id, {trigger:true})
    })
    this.$('.form-control').val('');

    // Also generate places from google api and save to the database here so that you can render on the next page

    
  }
})


// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&key=AIzaSyCsJcCSDOx5fdOlmWagQZabLeAe6EGxNSI

