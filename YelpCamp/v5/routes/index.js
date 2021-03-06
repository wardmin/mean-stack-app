var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");


// HOME ROUTE
router.get("/", function(req, res){
   res.render("landing");
});



// ===============
// AUTH ROUTES
// ===============

// show register form
router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if(err){
           console.log(err);
           return res.render("register");
       }
       passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds");
       });
   });
});

// show login form 
router.get("/login", function(req, res){
    res.render("login", {message: req.flash("error")});
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// LOGOUT ROUTE
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged you Out");
   res.redirect("/campgrounds");
});



// CATCH ALL
router.get("/*", function(req, res){
    res.render("landing");
});

// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router; 