var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// =================
// CAMPGROUND ROUTES
// =================

// INDEX - Route show all campgrounds
router.get("/", function(req, res){
    console.log(req.user);
    console.log(res.locals.currentUser);
//   res.render("campgrounds", {campgrounds:campgrounds}); 
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:campgrounds});
        }
    });
});

// CREATE - New
router.post("/", function(req, res){
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
    });
});


// NEW - Displays a form 
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW - displays details about an item
router.get("/:id", function(req, res){
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

module.exports = router; 