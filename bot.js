//Dependencies
var twit = require('twit');
var config = require('./config.js');
var Twitter = new twit(config);

var params = {
    q: '#popquote OR #greggpopovich OR #PopQuotes OR #PopQuotes OR #GreggPopovich OR #inpopwetrust OR #InPopWeTrust OR #WisdomOfCoachPop OR #PopForPrez OR #PresidentPop OR #CoachPoppa OR #ILikeItWhenYouCallMeCoachPoppa OR #CoachPoppa OR #PopForPresident OR #PopBeingPop OR #Pop2020 OR #PopGonnaPop OR #PopForever OR #PopForEver OR #Popovichkerr2020 OR #PopovichKerr2020', 
    result_type: 'recent',
    lang: 'en',
};

//Retweet Bot ----------------------------------
var retweet = function(){
    Twitter.get('search/tweets', params, function(err, data) {
      	// if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {id: retweetId}, function(err, response) {
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                    console.log(err.message);
                } else {
                    console.log('Retweeted');
                };
            });
        } else {
          console.log('Something went wrong while SEARCHING...');
        };
    });
}
// grab & retweet as soon as program is running...
retweet();
// retweet in every 60 min
setInterval(retweet, 3600000);

//===================================================


// Favorite Bot ------------------------------------
// find a random tweet and 'favorite' it
var favoriteTweet = function(){
	// find the tweet
	Twitter.get('search/tweets', params, function(err, data){
        // find tweets
        var tweet = data.statuses;
        var randomTweet = random_tweet(tweet);   // pick a random tweet

        // if random tweet exists
        if (typeof randomTweet != 'undefined') {
          	// Tell TWITTER to 'favorite'
          	Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
    	        // if there was an error while 'favorite'
    	        if(err){
    	          console.log('CANNOT BE FAVORITE... Error');
                  console.log(err.message);
    	        } else {
    	          console.log('FAVORITED... Success!!!');
            	};
        	});
        };
	});
}
// grab & favorite as soon as program is running...
favoriteTweet();
// favorite a tweet in every 60 minutes
setInterval(favoriteTweet, 3600000);


//Follow bot --------------------------------------------
var follow_tweeter = function(){
    // find a tweet
    Twitter.get('search/tweets', params, function(err, data){
        var tweet = data.statuses;
        var randomTweet = random_tweet(tweet);   // pick a random tweet
        var screen_name = randomTweet.user.screen_name; //get screen name of random tweeter
        // if random tweet exists
        if (typeof randomTweet != 'undefined') {
            // Tell TWITTER to 'follow'
            Twitter.post('friendships/create', {screen_name}, function(err, response){
                // if there was an error while 'follow' the user and print screen name
                if(err){
                  console.log('CANNOT FOLLOW... Error');
                  console.log(err.message);
                }; 
                if (response) {
                  console.log(screen_name, ': **FOLLOWED**');
                };
            });
        } else {
            console.log('Something went wrong while SEARCHING...');
        };
    });
};
// grab & favorite as soon as program is running...
follow_tweeter();
// favorite a tweet in every 60 minutes
setInterval(follow_tweeter, 3600000);


// function to generate a random tweet 
function random_tweet(arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};
