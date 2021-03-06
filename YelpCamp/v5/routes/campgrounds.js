var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var middleware  = require("../middleware");

// =================
// CAMPGROUND ROUTES
// =================

// INDEX - Route show all campgrounds
router.get("/", function(req, res){
    // console.log(req.user);
    // console.log(res.locals.currentUser);
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
router.post("/", middleware.isLoggedIn,  function(req, res){
     // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image; 
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name:name, image:image, description:desc, author:author};
    console.log("the user is " + req.user);
  
    // campgrounds.push(newCampground);
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
             // redirect back to campgrounds page
             console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});


// NEW - Displays a form 
router.get("/new", middleware.isLoggedIn, function(req, res){
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

// EDIT ROUTE 
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
        Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
            res.render("campgrounds/edit", {campground:foundCampground});    
            });
});

// UPDATE ROUTE 
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        console.log("this is what I want" + req.body);
        if(err){
            console.log(err);
             res.redirect("/campgrounds/");
        } else {
             res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds/" + req.params.id);
       } else {
           res.redirect("/campgrounds");
       }
   });
});
 
module.exports = router; 