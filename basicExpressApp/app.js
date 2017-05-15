var express = require("express");
var app = express();

// main page route
app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});

// animal route
app.get("/speak/:animal", function(req, res){
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!",
        cat: "Meow",
        goldfish: "glub"
    };
    var sound = sounds[animal];
    if (sound === undefined) {
        sound = "nothing really."
    };
   
    res.send("The " + animal + " says " + sound); 
}); 

// repeating text route
app.get("/repeat/:phrase/:amount", function(req, res) {
    var phrase = req.params.phrase;
    var amount = req.params.amount;
    var output = "";
    for (var i=0; i < amount; i++) {
        output += phrase + " ";
    }
    res.send(output);
    console.log(output);
});

// catch all route * 
app.get("/*", function(req, res) {
    res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!");
});