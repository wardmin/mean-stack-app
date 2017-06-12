var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_app");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static('public'));


// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES

// Blog.create({
//     title: "First post",
//     image: "https://unsplash.com/?photo=h0UG2Bd_Few",
//     body: "This is a test post"
// });

// INDEX ROUTE
app.get ("/", function(req, res){
    res.redirect("blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res){
       Blog.find({}, function(err, blogs){
           if(err){
               console.log(err);
           } else {
               res.render("index", {blogs: blogs});
           }
       });
});



// CATCH ALL route
app.get("/*", function(req, res){
    res.send("you found the bottom of the stack")
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Restful app server has started!");
});