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
  }
// enter functions that events will call upon
})