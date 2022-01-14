const express   = require("express");
const path      = require("path");
const http      = require("http");
const cors      = require('cors');

const router = express.Router();
const urlModule = require("url");

const app = express();

// Sets up the path where your static files are
const publicPath = path.resolve(__dirname, "../public");
// Sends static files from the publicPath directory
app.use(express.static(publicPath));

app.use(cors());

app.use(function(request,response,next) {
    console.log("Request IP: " + request.url);
    console.log("Request date: " + new Date());
    next();
});

// var fs = require('fs');
// var obj = JSON.parse(fs.readFileSync('public/lessons.json', 'utf8'));
// console.log(obj);
/* app.get("/lessons", function(request,response) {
    response.sendFile(path.join(__dirname+'/../client/html/index.html'));
}); */
// Sends static files from the publicPath directory
//app.use("/index",express.static(publicPath));

/* app.use(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Looks like you did not find a static file.");
});
 */
// lessons page
app.get("/lessons", function(request, response) {
    if      (!request.query.ajax)               response.sendFile(path.join(__dirname+'/../client/lessons.html'));
    else if (request.query.ajax == "lessons")	response.sendFile(path.join(__dirname+'/../json/lessons.json'));
    else                                        response.status(400).next();;
});
    
// User page
app.get("/user", function(request, response) {
    // response.render
    if(!request.query.ajax) response.sendFile(path.join(__dirname+'/../client/user.html'));
    else{ 
        response.send(request.query.ajax); 
    }
});

// page 404
app.use(function(request, response) {
    response.status(404);
    response.sendFile(path.join(__dirname+'/../client/404.html'));
});

//add the router
app.use('/', router);

// Starts the app on port 3000 and display a message when it’s started
app.listen(3000, function() {
    console.log("App started on port 3000");
});
