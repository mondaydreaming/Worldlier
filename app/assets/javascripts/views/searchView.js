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
    var saveTrip = new app.Trip ({
      sights_num: numberSights,
      location: location,
      location_radius: radius,
      tag: placeTag,
    });
    saveTrip.save();
    app.trips.add(saveTrip);
    this.$('.form-control').val('');
    app.appRouter.navigate('trips/'+ this.model.get(id) ) // need to pass id in on the router function for viewTrip
  }
})

saveTrip.save().done(function (trip) {
 ...
 navigate('/trips/' + trip.id, {trigger: true});
});






