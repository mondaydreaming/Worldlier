var app = app || {};

app.PlaceView = Backbone.View.extend({
  el: '#main',
  render: function(){
    console.log('rendering placeView.js');
    var html = $('#placeViewTemplate').html();
    this.$el.html(html)
// THIS PAGE WONT WORK UNTIL YOU SAVE TO THE DB AND THEN IDENTIFY THE SPECIFIC ID
    app.places.fetch().done(function(){
      // ARTICULATING TRIP FOR TIMELINE PURPOSES
      //WIKI
      var fetchWikipediaContent= function() {
        console.log('Fetching wikipedia content');
        $.ajax({
          url: 'http://en.wikipedia.org/w/api.php', 
          data: {
            action: 'parse',
            page: place.get('name'),
            format: 'json',
            prop: 'text',
            section: 0
          },
            dataType: 'jsonp',
        }).done(function(result){processWikipediaContent(result)});
      };

      var processWikipediaContent= function (content) {
        // Pass in success parameter! If successful, return wiki, if unsuccessful, tell the user to discover and see for themselves - save the place to the database description
        console.log('Processing wikipedia content')
        var fetchedRawContent = content.parse.text['*'];
        var $createElement = $('<div>').html(fetchedRawContent);
        var $introContent = $createElement.find('p');
        $('.wiki-container').append($introContent);
      };

      fetchWikipediaContent();

    })



  }
})