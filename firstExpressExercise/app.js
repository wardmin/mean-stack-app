var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res){
        res.send("Hi there!");
});

// "/bye"
app.get("/bye", function(req, res){
        res.send("Goodbye!!");
});

// "/dog" => "MEOW!"
app.get("/dog", function(req, res){
        res.send("MEOW!");
});

// ":" introducing the route parameters
app.get("/r/:subredditName", function(req, res){
        var subreddit = req.params.subredditName;
        console.log(req.params);
        res.send("welcome to the " + subreddit.toUpperCase() + " subreddit!");
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res){
        res.send("welcome to the comments page!");
});

// "*" => catchall route.
app.get("*", function(req, res){
        res.send("You are a super star!");
});

// Tell Express to listen for requests (start server)

app.listen(3000, function() {
        console.log("Server has started on port 3000!");
});
