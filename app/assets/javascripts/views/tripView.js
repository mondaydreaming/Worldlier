var app = app || {};

app.TripView = Backbone.View.extend({
  el: '#main',
  events: {
  // pass in events you're listening for e.g. clicking any of the image elements
  },
  render: function(){
    console.log('rendering tripview.js')
    var html = $('#tripViewTemplate').html();
    this.$el.html(html);

    // USE TEMPLATING TO PUSH THE GOOGLE MAP VIEW DOCUMENTED BELOW INTO THE DIVs
    
    // GOOGLE MAPS API
    var mapOptions = {
        center: new google.maps.LatLng(37.7831,-122.4039),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    new google.maps.Map(document.getElementById('map'), mapOptions);
  }
// enter functions that events will call upon

})


