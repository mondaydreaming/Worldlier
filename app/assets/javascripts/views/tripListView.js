var app = app ||{};

app. TripListView = Backbone.View.extend({
  tagName: 'li',
  events: {
    'click': 'showTrip'
  },
  render: function() {
    var tripListViewTemplate = $('#tripListView-template').html();
    var tripListViewHTML = _.template(tripListViewTemplate);
    this.$el.html(tripListViewHTML(this.model.toJSON()));
    $('#trips').append(this.$el);
  },

  showTrip: function() {
    app.appRouter.navigate('trips/' + this.model.get('id'), true);
  }
})
