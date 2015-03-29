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
    var val = [];
    $(':checkbox:checked').each(function(i){
      val[i] = $(this).val();
    });
    var placeTag = val.join('|');
    var numberSights = this.$('#number_sights').val();
    // debugger;
    var saveTrip = new app.Trip ({
      sightsnum: numberSights,
      location: location,
      location_radius: radius,
      tag: placeTag
    });
    saveTrip.save().done(function(trip){
      app.trips.add(saveTrip);
      app.appRouter.navigate('/trips/' + trip.id, {trigger:true})
    })
  }
})


// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&key=AIzaSyCsJcCSDOx5fdOlmWagQZabLeAe6EGxNSI


        // var results = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat+','+lng+'&radius='+radius+'&types='+ tags+'&key=AIzaSyCsJcCSDOx5fdOlmWagQZabLeAe6EGxNSI'
        // debugger;

        // var searchGPlaces = function() {
        //   console.log('searching Google Places')
        //   var GPlacesUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";

        //   return $.ajax(GPlacesUrl, {
        //     dataType: 'jsonp', // look up JSONP on wikipedia
        //     data: {
        //       location: lat + ',' +lng,
        //       radius: radius,
        //       types: tags,
        //       key: 'AIzaSyCsJcCSDOx5fdOlmWagQZabLeAe6EGxNSI'
        //     }
        //   });
        // }
        // debugger;
        // searchGPlaces().done(function(results){
        //   console.log(results)
        //   debugger;
        // });
        // console.log(results)   