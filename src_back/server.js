var express = require("express");
var path = require("path");
const cors = require('cors');

var app = express();

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.use(cors());

app.use(function(request,response,next) {
    console.log("Request IP: " + request.url);
    console.log("Request date: " + new Date());
    next();
});


// console.log(obj);
app.get("/lessons", function(request,response) {
    response.end( `
            {"topic": "MATH", "location": "London", "price": 100 },
            { "topic": "Science", "location": "Liverpool", "price": 80 },
            { "topic": "History", "location": "Oxford", "price": 90 },
            { "topic": "Geography", "location": "Bristol", "price": 120} `
    );
    // var fs = require('fs');
    // var obj = JSON.parse(fs.createReadStream('../index.html', 'utf8'));
    // console.log(obj);

});
// comment
app.get("/user", function(request, response) {
    // response.render
    response.end("{'email': 'user@email.com', 'password': 'mypassword'}");
});

app.use(function(request, response) {
    response.status(404).send("This page has not been made yet!");
});

app.listen(3000);
