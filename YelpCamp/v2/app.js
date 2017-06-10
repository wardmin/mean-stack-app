var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//     name: "Salmon Creek",
//     image:  "https://farm1.staticflickr.com/756/21043112059_788cbc12ed.jpg",
//     description: "this is a description"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("Newly Created Campground:");
//             console.log(campground);
//         }
//     }
// );

app.get("/", function(req, res){
   res.render("landing");
});


// INDEX - Route show all campgrounds
app.get("/campgrounds", function(req, res){
//   res.render("campgrounds", {campgrounds:campgrounds}); 
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:campgrounds});
        }
    })
});

// CREATE - New
app.post("/campgrounds", function(req, res){
     // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image; 
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description:desc};
    // campgrounds.push(newCampground);
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
             // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    })
  
});


// NEW - Displays a form 
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

// SHOW - displays details about an item
app.get("/campgrounds/:id", function(req, res){
        //find the campground with provided ID
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                console.log(err);
            } else {
                // render show template with that campground
                    res.render("show", {campground: foundCampground});
            }
        });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started!");
})