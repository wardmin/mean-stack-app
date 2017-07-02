var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    {
        name: "Uber Hills",
        image: "https://farm8.staticflickr.com/7168/6670258309_2e52bdbc6c.jpg",
        description: "The hills are high and mighty. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed massa vel ligula porttitor commodo. Pellentesque et quam quis metus pulvinar finibus. Nam at turpis imperdiet, euismod tortor ut, volutpat eros. Nulla egestas accumsan scelerisque. Duis molestie mauris eleifend, efficitur lorem sed, facilisis leo. Phasellus quis elit ut est vestibulum semper sit amet eu felis. Suspendisse consequat ipsum nec quam venenatis, sed ultricies arcu egestas. Aenean non maximus nisl."
    },
    {
        name: "Frosty Lake",
        image: "https://farm4.staticflickr.com/3750/33270974476_5f30b5b508.jpg",
        description: "Come in the winter when its frosty. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed massa vel ligula porttitor commodo. Pellentesque et quam quis metus pulvinar finibus. Nam at turpis imperdiet, euismod tortor ut, volutpat eros. Nulla egestas accumsan scelerisque. Duis molestie mauris eleifend, efficitur lorem sed, facilisis leo. Phasellus quis elit ut est vestibulum semper sit amet eu felis. Suspendisse consequat ipsum nec quam venenatis, sed ultricies arcu egestas. Aenean non maximus nisl."
    },
    {
        name: "Etobicoke Mountain",
        image: "https://farm8.staticflickr.com/7481/16039731518_32184abb79.jpg",
        description: "With a hill like that there is nowhere to camp. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed massa vel ligula porttitor commodo. Pellentesque et quam quis metus pulvinar finibus. Nam at turpis imperdiet, euismod tortor ut, volutpat eros. Nulla egestas accumsan scelerisque. Duis molestie mauris eleifend, efficitur lorem sed, facilisis leo. Phasellus quis elit ut est vestibulum semper sit amet eu felis. Suspendisse consequat ipsum nec quam venenatis, sed ultricies arcu egestas. Aenean non maximus nisl."
    }
];

function seedDB(){
    // remove all campgrounds
    Campground.remove({}, function(err) {
    // body...
        if(err){
            console.log(err);
        } 
        console.log("removed Campgrouds");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed Comments");
        });
        // add a few campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if(err){
        //             console.log(err);
        //         } else {
        //             console.log("added a Campground.");
        //             // create a comment
        //             Comment.create(
        //                 {
        //                     text: "This place is great!",
        //                     author: "Homey"
        //                 }, function(err, comment){
        //                     if(err){
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("created new comment.");
        //                     }
                            
        //                 });
        //             }
        //         });
        //     });
    });
}

module.exports = seedDB;
