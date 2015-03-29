var app = app || {};

app.TripView = Backbone.View.extend({
  el: '#main',
  events: {
    'click .place-details': 'placeDetails'
  },
  render: function(){
    console.log('rendering tripview.js')
    var html = $('#tripViewTemplate').html();
    this.$el.html(html);
  }, 

  placeDetails: function(){
    console.log('firing off place-details click')
    console.log('save places to the database')
    console.log('note savePlace must be made dynamic through google places api')
    var savePlace = new app.Place({
      name: 'Machu Picchu',
      description: 'Machu Picchu is great and beautiful'
    })
    savePlace.save().done(function(place){
      app.places.add(savePlace);
      app.appRouter.navigate('/places/' + place.id, {trigger:true})
    })   
  }
    // USE TEMPLATING TO PUSH THE GOOGLE MAP VIEW DOCUMENTED BELOW INTO THE DIVs
    
    // GOOGLE MAPS API
    // var mapOptions = {
    //     center: new google.maps.LatLng(37.7831,-122.4039),
    //     zoom: 12,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // };

    // var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // var markerOptions = {
    //   position: new google.maps.LatLng(37.7831, -122.4039)
    // };

    // var marker = new google.maps.Marker(markerOptions);
    //   marker.setMap(map);
    // }
    
// enter functions that events will call upon e.g. one that will navigate to the placeView.js

})


