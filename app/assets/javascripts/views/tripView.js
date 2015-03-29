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

    app.trips.fetch().done(function(){
      var mapOptions = {
        // pass in dynamic values for latlng from the database
          center: new google.maps.LatLng(37.7831,-122.4039),
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById('map'), mapOptions);

      var markerOptions = {
        // pass in dynamic values for latlng from the database
      position: new google.maps.LatLng(37.7831, -122.4039)
      };

      var marker = new google.maps.Marker(markerOptions);
      marker.setMap(map);

      var infoWindowOptions = {
      content: 'MAKE THIS DYNAMIC!'
      };

      var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
      google.maps.event.addListener(marker,'click',function(e){    
        infoWindow.open(map, marker);
      });


      
    })


      
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
})


