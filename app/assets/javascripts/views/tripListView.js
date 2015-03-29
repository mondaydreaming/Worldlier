var app = app ||{};

app.TripListView = Backbone.View.extend({
  el: '#main',
  events: {
    'click': 'showTrip'
  },
  render: function() {
    console.log('triplistview.js is being rendered')
    var self = this
    app.trips.forEach(function(trip){
      var tripListViewTemplate = $('#tripListView-template').html();
      var tripListViewHTML = _.template(tripListViewTemplate);
      self.$el.html(tripListViewHTML(trip.attributes));    
      // return trip.attributes
      // debugger;

    // Waiting for Joel's help - should be able to persist the loop results onto the page, currently just printing one at a time.
    })
  },

  showTrip: function() {
    app.appRouter.navigate('trips/' + this.model.get('id'), true);
  }
})
