var express = require("express");
var path = require("path");
var http = require("http");

var app = express();

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.use(function(request,response,next) {
    console.log("Request IP: " + request.url);
    console.log("Request date: " + new Date());
    next();
});

app.get("/lessons", function(request,response) {
    response.end("");
});
// comment
app.get("/user", function(request, response) {
    // response.render
    response.end("{'email': 'user@email.com', 'password': 'mypassword'}");
});

app.use(function(request, response) {
    response.end("This page has not been made yet!");
});

app.listen(3000);