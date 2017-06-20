var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose")
    User                    = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());


app.use(require("express-session")({
    secret: "Luna Luna",
    resave: false,
    saveUninitialized: false
}));



// HOME ROUTE
app.get("/", function(req, res){
    res.render("home");
});

// SECRET ROUTE
app.get("/secret", function(req, res){
    res.render("secret"); 
});


// START SERVER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Secret app has started");
});
