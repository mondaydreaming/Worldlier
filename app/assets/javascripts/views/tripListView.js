var app = app ||{};

app.TripListView = Backbone.View.extend({
  el: '#main',
  events: {
    'click h3': 'showTrip'
  },
  render: function() {
    console.log('triplistview.js is being rendered')
    var self = this
    app.trips.each(function(trip){
      var tripListViewTemplate = $('#tripListView-template').html();
      var tripListViewHTML = _.template(tripListViewTemplate);
      self.$el.append(tripListViewHTML(trip.attributes));    
    })
  },
  showTrip: function() {
    debugger;
    // NEED TO BE ABLE TO LINK BACK VIA URL TO TRIPS
    var self = this
    app.appRouter.navigate('trips/' + self.model.get('id'), true);
  }
})
