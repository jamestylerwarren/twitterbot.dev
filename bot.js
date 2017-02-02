//Dependencies
var twit = require('twit');
var config = require('./config.js');
var Twitter = new twit(config);

//Retweet Bot ----------------------------------

var retweet = function() {
	var params = {
    q: '#popquote OR #greggpopovich OR #PopQuotes OR #PopQuotes OR #GreggPopovich OR #inpopwetrust OR #InPopWeTrust OR #WisdomOfCoachPop OR #PopForPrez OR #PresidentPop OR #CoachPoppa OR #ILikeItWhenYouCallMeCoachPoppa OR #CoachPoppa OR #PopForPresident OR #PopBeingPop OR #Pop2020 OR #PopGonnaPop',
    result_type: 'mixed',
    lang: 'en',    
	} 

  Twitter.get('search/tweets', params, function(err, data) {
  	// if there no errors
    if (!err) {
      // grab ID of tweet to retweet
        var retweetId = data.statuses[0].id_str;
        // Tell TWITTER to retweet
        Twitter.post('statuses/retweet/:id', {
            id: retweetId
        }, function(err, response) {
            if (response) {
                console.log('Retweeted!!!');
            }
            // if there was an error while tweeting
            if (err) {
                console.log('Something went wrong while RETWEETING... Duplication maybe...');
            }
        });
    }
    // if unable to Search a tweet
    else {
      console.log('Something went wrong while SEARCHING...');
    }
  });
}
// grab & retweet as soon as program is running...
retweet();
// retweet in every 30 minutes
setInterval(retweet, 1800000);

//===================================================


// Favorite Bot ------------------------------------

// find a random tweet and 'favorite' it
var favoriteTweet = function(){
	var params = {
    	q: '#popquote OR #greggpopovich OR #PopQuotes OR #PopQuotes OR #GreggPopovich OR #inpopwetrust OR #InPopWeTrust OR #WisdomOfCoachPop OR #PopForPrez OR #PresidentPop OR #CoachPoppa OR #ILikeItWhenYouCallMeCoachPoppa OR #CoachPoppa OR #PopForPresident OR #PopBeingPop OR #Pop2020 OR #PopGonnaPop', 
    	result_type: 'mixed',
    	lang: 'en',
	}

	// find the tweet
	Twitter.get('search/tweets', params, function(err, data){

    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);   // pick a random tweet

    // if random tweet exists
    if(typeof randomTweet != 'undefined'){
      	// Tell TWITTER to 'favorite'
      	Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response) {
	        // if there was an error while 'favorite'
	        if(err){
	          console.log('CANNOT BE FAVORITE... Error');
	        }
	        else {
	          console.log('FAVORITED... Success!!!');
        	}
    	});
    }
	});
}

// grab & favorite as soon as program is running...
favoriteTweet();
// favorite a tweet in every 20 minutes
setInterval(favoriteTweet, 1200000);


// function to generate a random tweet 
function ranDom(arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};
