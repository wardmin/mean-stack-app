var faker = require("faker");

// print out title
console.log("==================");
console.log("WELCOME TO MY SHOP");
console.log("==================");

// print out 10 items with prices

var myShop = function(){
        for (i = 0; i < 10; i++) {
console.log(faker.commerce.productName() + ' - $' + faker.commerce.price());i
}
}
// call function
myShop();