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
    var placeTag = [];
    $(':checkbox:checked').each(function(i){
      results = $(this).val().split(' ');
      placeTag = placeTag.concat.apply(placeTag,results)
    });
    console.log(placeTag)
    var numberSights = this.$('#number_sights').val();

    var saveTrip = new app.Trip ({
      sightsnum: numberSights,
      location: location,
      location_radius: radius,
      tag: JSON.stringify(placeTag)
    });
    saveTrip.save().done(function(trip){
      app.trips.add(saveTrip);
      app.appRouter.navigate('/trips/' + trip.id, {trigger:true})
    })
  }
})