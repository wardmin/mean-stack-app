var express     = require("express");
var router      = express.Router({mergeParams:true});
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");


// ==============
// COMMENT ROUTES 
// ==============

// NEW route
router.get("/new", middleware.isLoggedIn, function(req, res) {
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
router.post("/", middleware.isLoggedIn, function(req, res){
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
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err){
            console.log(err);
        } else {
            res.render("comments/edit", {campground_id:req.params.id, comment:comment});
        }
    });
});

// UPDATE ROUTE 
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           console.log(err);
           res.redirect("/campgrounds/" + req.params.id);
       } else {
            res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    // res.send("you hit the delte button");
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


module.exports = router;