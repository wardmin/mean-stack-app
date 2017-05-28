var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// add a new cat to the DB

// var george = new Cat({
//     name: "mister mistoffelees",
//     age: 21,
//     temperament: "sociopathic"
// });

// george.save(function(err, cat){
//     if(err){
//         console.log("Something went wrong!");
//     } else { 
//         console.log("We just saved a Cat to the DB:");
//         console.log(cat);
//     }
// });

Cat.create({
    name: "Cookie",
    age: 7,
    temperament: "needs work"
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
});


// retreive all cats from the DB and console.log each one.
Cat.find({}, function(err, cats){
    if(err){
        console.log("Something went wrong!");
        console.log(err);
    } else {
        console.log("All the cats are: ")
        console.log(cats);
    }
});
