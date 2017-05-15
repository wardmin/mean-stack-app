var express = require("express");
var app = express();

// public directory
app.use(express.static("public"));
app.set("view engine", "ejs");

// home route
app.get("/", function(req, res){
    res.render("home");
});

app.get("/fallinlovewith/:thing", function(req,res){
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res){
    var posts =[
        {title: "Post 1", author: "Susy"},
        {title: "The ultimate Hot Dog", author: "Ward"},
        {title: "Watching Trump", author: "The Donald"}
        ];
    res.render("posts", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is operational!!");
});