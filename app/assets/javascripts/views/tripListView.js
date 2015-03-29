var app = app ||{};

app. TripListView = Backbone.View.extend({
  el: '#main',
  events: {
    'click': 'showTrip'
  },
  render: function() {
    console.log('triplistview.js is being rendered')
    var self = this
    app.trips.each(function(trip){
      // console.log(trip)
      var tripListViewTemplate = $('#tripListView-template').html();
      var tripListViewHTML = _.template(tripListViewTemplate);
      
      // debugger;
      self.$el.html(tripListViewHTML(trip.attributes)); 
      // $('#trips').append(self.$el);     
    })

  },

  showTrip: function() {
    app.appRouter.navigate('trips/' + this.model.get('id'), true);
  }
})
