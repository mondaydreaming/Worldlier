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
      // marker.setMap(map);

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

      var service;
      var infowindow;

      var request = {
        location: new google.maps.LatLng(lat, lng),
        radius: radius,
        types: JSON.parse(tag),
      };

      // setting up wayfinding 






      // }

////////////////

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);

      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          var tripPlaces = _.sample(results, app.sightsnum);

          var start = tripPlaces[0].name;
          var end = tripPlaces[app.sightsnum-1].name;
          debugger;
          var waypts = [];
          for (var i = 1; i < tripPlaces.length-1 ; i++) {
            var place = tripPlaces[i]
            console.log(i, place)
            //For each tripPlace, save as a waypoints
            if ((tripPlaces[i] !== start)|| (tripPlaces[i] !== end)){
              waypts.push({
                location: tripPlaces[i].name,
                stopover:true
              })  
            }

            // debugger;

            // Obtain details for each place
            var detailsRequest = {
              placeId: place.place_id
            };

            var infowindow = new google.maps.InfoWindow();
            service.getDetails(detailsRequest, detailsCallback);

            // Renders the markers and infowindows
            function detailsCallback(place, status) {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                //Persist to database
                var savePlace = new app.Place({
                  name: place.name,
                  latitude: place.geometry.location.D,
                  longitude: place.geometry.location.k 
                });
                savePlace.save();

                // Render marker
                var marker = new google.maps.Marker({
                  map: map,
                  position: place.geometry.location
                });

                marker.setMap(map);

                // Render infowindow
                google.maps.event.addListener(marker, 'click', function() {
                  var infoContent = '<div><h6>' + place.name + '</h6></div>'+ place.formatted_address
                  infowindow.setContent(infoContent);
                  infowindow.open(map, this);
                });
              }
            }            
          }
          // Render directions
          var directionsDisplay;
          var directionsService = new google.maps.DirectionsService();
          directionsDisplay = new google.maps.DirectionsRenderer();
          directionsDisplay.setMap(map);
          directionsDisplay.setPanel(document.getElementById('directions-panel'))
          // var selectedMode = document.getElementById('mode').value;

          var directionsRequest = {
              origin: start,
              destination: end,
              waypoints: waypts,
              optimizeWaypoints: true,
              travelMode: google.maps.TravelMode.DRIVING // This will be changed to allow for options - Why can't selected Mode work?
          };

          debugger;
          // Why is waypts not saving each tripView[i]????
          // How can we ensure that the shortest route is found? - at the moment end is just set to the last in the array, not necessarily the furthest away... - it is optimizing based on params we pass in though

          directionsService.route(directionsRequest, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
              var route = response.routes[0];
            }
          });          
        }
      }
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


