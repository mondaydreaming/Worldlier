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
    // debugger;
    var saveTrip = new app.Trip ({
      sightsnum: numberSights,
      location: location,
      location_radius: radius,
      // tag: $("input[type='checkbox']").val();,
    });
    saveTrip.save().done(function(trip){
      app.trips.add(saveTrip);
    // Also generate places from google api and save to the database here so that you can render on the next page

    //JSON of Google Places results
      // var self = this
      app.trips.fetch().done(function(){
        var trip = app.trips.findWhere({
          id: app.trips.last().get('id')
        });
        var lat = trip.attributes.latitude;
        var lng = trip.attributes.longitude;
        var radius = parseInt(trip.attributes.location_radius)*1000
        var val = [];
        $(':checkbox:checked').each(function(i){
          val[i] = $(this).val();
        });
        var tags = val.join('|');

        //var results = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat+','+lng+'&radius='+radius+'&types='+ tags+'&key=AIzaSyCsJcCSDOx5fdOlmWagQZabLeAe6EGxNSI'

        var searchGPlaces = function() {
          console.log('searching Google Places')
          var GPlacesUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";

          return $.getJSON(GPlacesUrl), {
            location: lat, lng,
            radius: radius,
            types: tags,
            key: AIzaSyCsJcCSDOx5fdOlmWagQZabLeAe6EGxNSI
          }
        }




        console.log(results)   
        debugger;
        app.appRouter.navigate('/trips/' + trip.id, {trigger:true})
      })
    })
  }
})


// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&key=AIzaSyCsJcCSDOx5fdOlmWagQZabLeAe6EGxNSI

