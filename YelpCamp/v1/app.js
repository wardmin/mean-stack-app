var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
            { name: "Shits Creek", image: "https://farm7.staticflickr.com/6082/6142484013_74e3f473b9.jpg"},
            { name: "Granite Hill", image: "https://farm1.staticflickr.com/756/21043112059_788cbc12ed.jpg"},
            { name: "Mountain Goat's Rest", image: "https://farm6.staticflickr.com/5786/20607281024_5c7b3635cc.jpg"}
            ];
   res.render("campgrounds", {campgrounds:campgrounds}); 
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started!");
})