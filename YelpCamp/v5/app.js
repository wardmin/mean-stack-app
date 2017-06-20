// v5

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");
    
    
seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + 'public'));

// HOME ROUTE
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
            res.render("campgrounds/index", {campgrounds:campgrounds});
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
    res.render("campgrounds/new");
});

// SHOW - displays details about an item
app.get("/campgrounds/:id", function(req, res){
        //find the campground with provided ID
        Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
            if(err){
                console.log(err);
            } else {
                // render show template with that campground
                console.log(foundCampground);
                    res.render("campgrounds/show", {campground: foundCampground});
            }
        });
});

// ==============
// COMMENTS ROUTE 
// ==============

app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
            if(err){
                console.log(err);
            } else {
                // render show template with that campground
                console.log(foundCampground);
                res.render("comments/new", {campground: foundCampground}); 
            }
        });
});
app.post("/campgrounds/:id/comments", function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
    // create new comment
    // connect new comment to campground
    // redirect to show page.
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started!");
});