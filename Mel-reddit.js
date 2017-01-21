//var request = require('request');
var requestPromise = require('request-promise');
var promptPromise = require('prompt-promise');
var inquirer = require('inquirer');

//================RE-USABLE FXNS====================================
function getWebpagePromise(url) {
  return requestPromise(url)
    .then(function(res) {
      var response = JSON.parse(res);

      ///Displaying each post's title, url, votes, and username

      var posts = [];

      //should be array
      //console.log("typeof posts: ", typeof response.data.children);

      response.data.children.forEach(function(eachPost) {
        posts.push({
          title: eachPost.data.title,
          //url: eachPost.data.url,
          //votes: eachPost.data.ups,
          //username: eachPost.data.name
        });
      });

      return posts; // look at the result and explain why we're returning .data.children
    });
}


//==================================================================

/*
This function should "return" the default homepage posts as an array of objects
*/
function getHomepage() {
  // Load reddit.com/.json and call back with the array of posts
  // TODO: REPLACE request with requestAsJson!

  var url = "https://reddit.com/.json";

  return getWebpagePromise(url)
    .then(function(result) {
      console.log(result);
    })
    .catch(function(err) {
      console.log("Error. Something happened. Try again later.", err);
    });
}

/*
This function should "return" the default homepage posts as an array of objects.

In contrast to the `getHomepage` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedHomepage() {
  // Load reddit.com/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
  // ESSENTIALLY, sorting method is adding "hot", "new", "rising", "controversial", "top", "gilded", "wiki", "promotional" words to the reddit API url

  /*
  LOGIC
  1. inquire(promise) user for HOW they want to sort their homepage
  2. Check if sorting method valid
  3. getWebpagePromise
  */
  var words = ["hot", "new", "rising", "controversial", "top", "promotional"];

  inquirer.prompt({
      type: 'list',
      name: 'choice',
      message: 'How do you want to sort your reddit page?',
      choices: words
    })
    .then(function(answer) {

      //console.log("user answer: ", answer.choice, "\n typeof: ", typeof answer.choice); //testing that answer is a string

      var url = "";

      
      words.forEach(function(eachWord) {
        if (eachWord === answer.choice) {
          url = "https://reddit.com/" + answer.choice + ".json";
          
          if(answer.choice === "promotional"){
            url = "https://www.reddit.com/ads.json";
          }
        }
      });

      //console.log("url: ", url);

      return getWebpagePromise(url)
        .then(function(result) {
          console.log(result);

          promptPromise.done();
        })
        .catch(function(error) {
          console.log("Error happened. Try again.", error);

          promptPromise.finish();
        });

    });

}

/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
*/
function getSubreddit(subreddit, callback) {
  // Load reddit.com/r/{subreddit}.json and call back with the array of posts



}

/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
In contrast to the `getSubreddit` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedSubreddit(subreddit, sortingMethod, callback) {
  // Load reddit.com/r/{subreddit}/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods


}

/*
This function should "return" all the popular subreddits
*/
function getSubreddits(callback) {
  // Load reddit.com/subreddits.json and call back with an array of subreddits
}

// Export the API
module.exports = {
  getHomepage: getHomepage,
  getSortedHomepage: getSortedHomepage,
  /* getSubreddit: getSubreddit,
   getSortedSubreddit: getSortedSubreddit,
   getSubreddits: getSubreddits*/

};
