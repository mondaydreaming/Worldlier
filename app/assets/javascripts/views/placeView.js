var app = app || {};

app.PlaceView = Backbone.View.extend({
  el: $('#main'),
  render: function(){
    console.log('rendering placeView.js')
    var html = $('#placeViewTemplate').html();
    this.$el.html(html)
  }
})