var app = app || {};

app.TripView = Backbone.View.extend({
  el: '#main',
  // events: {
  //   'click .place-details': 'placeDetails'
  // },

  render: function(){
    console.log('rendering tripview.js')

    var html = $('#tripViewTemplate').html();
    this.$el.html(html);

    var self = this;
    this.places = new app.Places({trip_id: this.model.get('id')})

    // fetch trip and places data simultaneously
    var tripsFetch = app.trips.fetch()
    var placesFetch = this.places.fetch()

    $.when(tripsFetch, placesFetch).done(function(){
      app.tripPlace = self.places.models
      
      for (var i = 0; i < app.tripPlace.length; i++) {
        var fetchWikipediaContent= function() {
          var place = app.tripPlace[i]
          console.log('Fetching wikipedia content');
          $.ajax({
            url: 'http://en.wikipedia.org/w/api.php', 
            data: {
              action: 'parse',
              redirects: true,
              page: place.get('name'),
              format: 'json',
              prop: 'text',
              section: 0
            },
              dataType: 'jsonp',
          }).done(function(result){processWikipediaContent(result, place)});
        };

        var processWikipediaContent= function (content, place) {
          // Pass in success parameter! If successful, return wiki, if unsuccessful or if successful but is a redirect, tell the user to discover and see for themselves - save the place to the database description
          console.log('Processing wikipedia content')
          var fetchedRawContent
          if ( content.parse ) {
            fetchedRawContent = content.parse.text['*'];
          }
          var $createElement = $('<div>').html(fetchedRawContent);
          var $introContent = $createElement.find('p');
          $('a[href^="/wiki/"]').each(function (i, e) {
            $(e).attr('href', 'http://en.wikipedia.org' + $(e).attr('href'));
          });
          var $displayContent = $('<div>').html($introContent).addClass('placeDetails')
          var dividers = $('<span>').html('glyphicon glyphicon-send')
          var photo_url = place.get('photo_url')
          //need to get attr ids to be dynamic
          var placeImage = $('<div>').html($displayContent).addClass('placeImage').attr("style", "background-image: url(" + photo_url + "); background-size: cover; background-position: cover;")
          //app.placeImage.attr('id',i)
          var imageTitle = $('<h3>').html("//" + place.get('name')).addClass('imageHeading')
          placeImage.prepend(imageTitle)
          $('.wiki-container').append(placeImage);

        };
        fetchWikipediaContent();     
      };


      //ARTICULATING TRIP FOR GOOGLE PURPOSES
      // Trip parameters

      var trip = app.trips.findWhere({
        id: self.model.get('id')
      });

      var lat = trip.attributes.latitude;
      var lng = trip.attributes.longitude;
      // Drawing map for trip
      var mapOptions = {
          center: new google.maps.LatLng(lat, lng),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      app.currentMap = map;

        var markerOptions = {
          position: new google.maps.LatLng(lat, lng),
        };

        var marker = new google.maps.Marker(markerOptions);
        marker.setMap(map);

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

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);


      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          var start = app.tripPlace[0].get('name');
          var end = app.tripPlace[app.sightsnum-1].get('name');
          var waypts = [];
          for (var i = 1; i < app.tripPlace.length - 1; i++) {
            var place = app.tripPlace[i]
            //For each tripPlace, save as a waypoints
            if ((app.tripPlace[i] !== start)|| (app.tripPlace[i] !== end)){
              waypts.push({
                location: app.tripPlace[i].get('name'),
                stopover:true
              })  
            }
            // Obtain details for each place
            var detailsRequest = {
              placeId: place.get('google_id')
            };
            var infowindow = new google.maps.InfoWindow();
            service.getDetails(detailsRequest, detailsCallback);

            // Renders the markers and infowindows
            function detailsCallback(place, status) {
              if (status == google.maps.places.PlacesServiceStatus.OK) {

                // Trying to fetch place data out
                // app.places.fetch().done(function(){
                //   // How do I limit it for only the one trip? This will fetch all of the places for all trips
                //   app.places.each(function(place){
                //   var timelineTemplate = $('#tripPlace-template').html()
                //   var timelineHTML = _.template(timelineTemplate(place.attributes));
                //   console.log(place.attributes)
                //   })
                // })

                // Render marker
                // var marker = new google.maps.Marker({
                //   map: map,
                //   position: place.geometry.location
                // });

                // marker.setMap(map);

                // Render infowindow
                // google.maps.event.addListener(marker, 'click', function() {
                //   var infoContent = '<div><h6>' + place.name + '</h6></div>'+ place.formatted_address
                //   infowindow.setContent(infoContent);
                //   infowindow.open(map, this);
                // });
              }
            };

          }
          // Render directions
          var directionsDisplay = new google.maps.DirectionsRenderer();
          var directionsService = new google.maps.DirectionsService();

          directionsDisplay.setMap(map);
          directionsDisplay.setPanel(document.getElementById('directions-panel'))

          var directionsRequest = {
              origin: start,
              destination: end,
              waypoints: waypts,
              optimizeWaypoints: true,
              travelMode: google.maps.TravelMode.DRIVING 
          };

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

  // placeDetails: function(event){
  //   event.preventDefault()
  //   savePlace.save().done(function(place){
  //     app.places.add(savePlace);
  //     app.appRouter.navigate('/places/' + place.id, {trigger:true})
  //   })   
  // }
})


