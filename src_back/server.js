var express = require("express");
var path = require("path");

var fs = require('fs');

var app = express();
var publicPath = path.join(__dirname, "../public/");
app.use(express.static(publicPath));

app.use(function (request, response, next) {
    console.log("Request IP: " + request.url);
    console.log("Request date: " + new Date());
    next();
});

app.get("/lessons", function (request, response) {
    response.end(`
            {   "topic": "MATH", "location": "London", "price": 100         },
            {   "topic": "Science", "location": "Liverpool", "price": 80    },
            {   "topic": "History", "location": "Oxford", "price": 90       },
            {   "topic": "Geography", "location": "Bristol", "price": 120   } `
    );

});

// comment
app.get("/user", function (request, response) {
    // response.render
    response.end("{'email': 'user@email.com', 'password': 'mypassword'}");
});

app.use(function (request, response) {
    response.status(404).send("This page has not been made yet!");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});



