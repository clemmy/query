/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */



var ajax = require('ajax');

var UI = require('ui');
//var Vector2 = require('vector2');

var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  body: 'Press any button.'
});

main.show();

setInterval(function() {
  console.log('refresh');
}, 2000);


var content = "Hello World";

// var content = HTTPGET("http://api.theysaidso.com/qod.json");
// var json = JSON.parse(content);
// var question = json.name;

ajax(
  {
    url: 'http://api.theysaidso.com/qod.json',
    type: 'json'
  },
  function(data, status, request) {
    // Show a card with clicked item details
    
      var detailCard = new UI.Card({
        subtitle: "Question was:",
        body: status //options[event.itemIndex].body <- event not defined here, so pick a working body attr
  
      });
      
      // Show the new Card
      detailCard.show();
    
  },
  function(error, status, request) {
    console.log('The ajax request failed: ' + error);
  }
);


/* Make a simple list of menu items */
var options = [
	{
		title: "Yes",
		subtitle: "Upvote Question!",
    body: content
    
	},
	{
		title: "No",
		subtitle: "Don't Upvote Question.",
    body: content
	}
];

/* Create the Menu, supplying the list of fruits */

var optionsMenu = new UI.Menu({
	sections: [{
		title: "The Current Question",
		items: options
	}]
});

/* Show the menu */
optionsMenu.show();


/* Show detailed menu when clicked */
optionsMenu.on('select', function(event) {
  // Send out data to server
  
  var objectData =
         { 
           //something here        
         };

var objectDataString = JSON.stringify(objectData);
  ajax({
    type: "POST",
    url: "www.coastline.com/json",
    dataType: "json",
    data: {
      o: objectDataString
    },
    success: function(data) {
      console.log('Successful!');
    },
    error: function(data){ 
      console.log('Error!');
    }
  });
  
    var thankYou = new UI.Card({
      title: ' Pebble.js',
      icon: 'images/menu_icon.png',
      body: 'Thanks for Voting',
    });
    thankYou.show();
});





