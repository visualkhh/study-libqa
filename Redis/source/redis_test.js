var redis = require("redis");
var client = redis.createClient();

function setKey() {
        client.set("article:12345:headline", "Google wants to Turn Your Clothes Into a Computer");
        client.set("article:10001:headline", "For Millennials, the End of the TV Viewing Party");
        client.set("article:60056:headline", "Alicia Vikander, Who Portrayed,xxxxx");
}

function upVote(id) {
  var key = "article:" + id + ":headline";
  client.incr(key);
}

function downVote(id) {
  var key = "article:" + id + ":headline";
  client.decr(key);
}

function showResults(id) {
  var headlineKey = "article:" + id + ":headline";
  var voteKey = "article:" + id + ":votes";
  client.mget([headlineKey, voteKey], function(err, replies) {
    console.log('The article "' + replies[0] + '" has', replies[1], 'votes');
  });
}

setKey();
upVote(12345);
upVote(12345);
upVote(12345);
upVote(10001);
upVote(10001);
downVote(10001);
upVote(60056);
showResults(12345);
showResults(10001);
showResults(60056);
client.quit();
