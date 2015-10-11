var http = require('http');
var fs = require('fs');
var port = 8000;

var redis  = require("redis");
var client = redis.createClient();

var index = fs.readFileSync(__dirname + "/Public/index.html");
var index1 = fs.readFileSync(__dirname + "/Public/index1.html");
var index2 = fs.readFileSync(__dirname + "/Public/index2.html");
var indexJS = fs.readFileSync(__dirname + '/Public/main.js');

var server = http.createServer(handler);
server.listen(port);
console.log("Server running at http://localhost:" + port);

function handler(req, res){
  var url = req.url;
  if (url==="/"){
    res.writeHead(200, {"Content Type":"text/html"});
    res.end(index);
  } else if (url === '/main.js') {
    res.writeHead(200, {'Content-Type': 'text/js'});
    res.end(indexJS);
  } else if (req.method === 'POST') {
    res.writeHead(200, {"Content Type":"text/html"});
    tweet(res,res);
  } else if (url==="/Posts"){
    res.writeHead(200, {"Content Type":"text/html"});
    console.log(req);
    showPosts(req,res);
  }
}

function showPosts(req,res){
  client.GET('tweetCount',function(err,reply){
    var tweetCount=reply;
    console.log(tweetCount);
    var count=0;
    res.write(index1);
    for (i=1;i<=tweetCount;i++){
      console.log("tc", tweetCount);
      console.log("count", count);
      client.HGETALL('twit:'+i, function(err,reply){
      count++;
        if (count.toString()===tweetCount){
          res.write("<li>"+reply.tweet+"</li>");
          res.end(index2);
        } else {
            console.log(reply.tweet);
            res.write("<li>" + reply.tweet+"</li>");
          }
      });
    }
  });

}



// function tweet(){
//   var body = '';
//   req.on('data', function (dataChunk) {
//       body += dataChunk;
//   });
//   req.on('end', function () {
//     console.log(deets);
//       var entries = body.split('&');
//       var deets = entries.map(splitByEquals);
//       client.incr('twitCount', function(err, twitCount){
//         var id = twitCount;
//         client.HSET('twit:' + id, "text", deets[0], redis.print);
//         // client.HSET('user:' + id, "surname", deets[1][1], redis.print);
//         // client.HSET('user:' + id, "email", deets[2][1],redis.print);
//       });
//   });
// }
