var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    User                    = require("./models/user"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
    secret: "Luna Luna",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ========
// ROUTES
// ========

// HOME ROUTE
app.get("/", function(req, res){
    res.render("home");
});

// SECRET ROUTE
app.get("/secret",isLoggedIn, function(req, res){
    res.render("secret"); 
});


// LOGIN ROUTES 
// render login form
app.get("/login", function(req, res){
    res.render("login");
});
// Login logic 
// middle ware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
});



// AUTH routes
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    // res.send("REgister post route.");
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.render('register');
            }
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secret");
            });
    });
});

// LOG OUT
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
 

// START SERVER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Secret app has started");
});
