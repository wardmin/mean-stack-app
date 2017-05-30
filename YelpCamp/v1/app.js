var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
            { name: "Shits Creek", image: "https://farm7.staticflickr.com/6082/6142484013_74e3f473b9.jpg"},
            { name: "Granite Hill", image: "https://farm1.staticflickr.com/756/21043112059_788cbc12ed.jpg"},
            { name: "Mountain Goat's Rest", image: "https://farm6.staticflickr.com/5786/20607281024_5c7b3635cc.jpg"},
            { name: "Shits Creek", image: "https://farm7.staticflickr.com/6082/6142484013_74e3f473b9.jpg"},
            { name: "Granite Hill", image: "https://farm1.staticflickr.com/756/21043112059_788cbc12ed.jpg"},
            { name: "Mountain Goat's Rest", image: "https://farm6.staticflickr.com/5786/20607281024_5c7b3635cc.jpg"}
            ];
            
app.get("/", function(req, res){
   res.render("landing");
});

app.get("/campgrounds", function(req, res){
   res.render("campgrounds", {campgrounds:campgrounds}); 
});

app.post("/campgrounds", function(req, res){
     // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image; 
    var newCampground = {name:name, image:image};
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started!");
})