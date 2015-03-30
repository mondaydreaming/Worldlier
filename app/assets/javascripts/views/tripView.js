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

    var self = this;

    app.trips.fetch().done(function(){
      //articulating trip
      // Trip parameters
      var trip = app.trips.findWhere({
        id: self.model.get('id')
      });
      var lat = trip.attributes.latitude;
      var lng = trip.attributes.longitude;
      // Drawing map for trip
      var mapOptions = {
          center: new google.maps.LatLng(lat, lng),
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      app.currentMap = map;

      var markerOptions = {
        position: new google.maps.LatLng(lat, lng)
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

      // articulating place
      var tag = trip.attributes.tag;
      var sightsnum = trip.attributes.sightsnum;
      app.sightsnum = sightsnum
      var radius = parseInt(trip.attributes.location_radius)*1000
      console.log('lat:', lat, 'lng:',lng, 'radius:',radius, 'tags:',tag, 'sights:', sightsnum, 'location:', location)

      var service;
      
      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(nearbyRequest, nearbyCallback);
      service.getDetails(detailsRequest, detailsCallback);



      

    })   
  }, 

  placeDetails: function(){
    console.log('firing off place-details click')
    console.log('save places to the database')
    console.log('note savePlace must be made dynamic through google places api')
    var savePlace = new app.Place({
      // save dynamic places
      name: 'Machu Picchu',
      description: 'Machu Picchu is great and beautiful'
    })
    savePlace.save().done(function(place){
      app.places.add(savePlace);
      app.appRouter.navigate('/places/' + place.id, {trigger:true})
    })   
  }
})



//CODE HELL - WHERE UNWANTED CODE GOES TO DIE
      // var infowindow;

      // var nearbyRequest = {
      //   location: new google.maps.LatLng(lat, lng),
      //   radius: radius,
      //   types: JSON.parse(tag),
      // };

      // var detailsRequest = {
      //   placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
      // };
      // function nearbyCallback(results, status) {
      //   if (status == google.maps.places.PlacesServiceStatus.OK) {
      //     var tripPlaces = _.sample(results, app.sightsnum)
      //     for (var i = 0, place; place = tripPlaces[i]; i++) {
      //       var marker = new google.maps.Marker({
      //         map: map,
      //         position: place.geometry.location
      //       });
      //       marker.setMap(map);
      //       //save the place to the database
      //     }
      //   }
      // }

      // function detailsCallback(place, status) {
      //   if (status == google.maps.places.PlacesServiceStatus.OK) {
      //     createMarker(place);
      //   }
      // }




