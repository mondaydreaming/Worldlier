var app = app || {};

app.AppView = Backbone.View.extend({
  el: '#main',
  render: function(){
    console.log('rendering app.AppView')
    var appViewHTML = $('#appView-template').html();
    this.$el.html(appViewHTML);

//section below is not rendering!!!! - might not need to if not using appView
    // this.collection.each(function(trip) {
    // console.log('rendering app.AppView')

    // });
  }
});
