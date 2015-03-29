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
      var tag = trip.attributes.tag;
      var sightsnum = trip.attributes.sightsnum;
      var radius = parseInt(trip.attributes.location_radius)*1000
      console.log('lat:', lat, 'lng:',lng, 'radius:',radius, 'tags:',tag, 'sights:', sightsnum)
      debugger;

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
      // var map;
      // var service;
      // var infowindow;

      // function initialize() {
      //   var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

      //   map = new google.maps.Map(document.getElementById('map'), {
      //       center: pyrmont,
      //       zoom: 15
      //     });

      //   var request = {
      //     location: pyrmont,
      //     radius: '500',
      //     types: ['store']
      //   };

      //   service = new google.maps.places.PlacesService(map);
      //   service.nearbySearch(request, callback);
      // }

      // function callback(results, status) {
      //   if (status == google.maps.places.PlacesServiceStatus.OK) {
      //     for (var i = 0; i < results.length; i++) {
      //       var place = results[i];
      //       createMarker(results[i]);
      //     }
      //   }
      // }
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


