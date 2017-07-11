// v7

var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    flash           = require("connect-flash"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    User            = require("./models/user"),
    Comment         = require("./models/comment"),
    seedDB          = require("./seeds");
    
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");
    
// seed the database
// seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.use(flash());


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Ward will master this shit!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started!");
});