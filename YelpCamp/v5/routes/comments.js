var express     = require("express");
var router      = express.Router({mergeParams:true});
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");


// ==============
// COMMENT ROUTES 
// ==============

// NEW route
router.get("/new", isLoggedIn, function(req, res) {
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

// CREATE route 
router.post("/", isLoggedIn, function(req, res){
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
                    // add username and id to the comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// EDIT ROUTE
router.get("/:comment_id/edit", function (req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            Comment.findById(req.params.comment_id, function(err, comment){
                if(err){
                    console.log(err);
                }
            res.render("comments/edit", {campground:campground, comment:comment});
            });
        }
    });
});

// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router; 