var app = app || {};

app.AppView = Backbone.View.extend({
  el: '#main',
  render: function(){
    var appViewHTML = $('#appView-template').html();
    this.$el.html(appViewHTML);

    this.collection.each(function(trip) {
      var tripListView = new app.tripListView({model: trip});
      tripListView.render();
    });
  }
});
