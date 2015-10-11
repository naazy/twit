function displayDB (){

  var tweetWrap= document.getElementById('tweetWrap');
  var req = new XMLhttprequest();
    url= "/Posts";
    req.open ('GET', url);
    req.send();
  req.onreadystatechange = function (){
    if (req.status===200 && req.readyState===4){
      console.log(req.responseText);
      console.log("hi");
      // var tweet=JSON.stringify(req.responseText);
      // tweetWrap.innerHTML = tweet;
    }
  };
}



  //   var i, body, button;
  //   //dynamically build site!
  //   var html =
  //       "<input placeholder=\"text\" id=\"roar\"></input>" +
  //       "<button id=\"button\">submit</button>" +
  //       "<div id =\"tweetWrap\">";
  //   for (i = data.length-1; i >= 0; i--) {
  //     html += makeTweet(data[i]);
  //     console.log(i + " : " + data[i]);
  //   }
  //   html += "</div>";
  //
  //   div.innerHTML = html;
  //   addDeleteListeners();
  //   button = document.getElementById("button");
  //   button.addEventListener("click", postEvent);
  //   console.log(html);
  // }
