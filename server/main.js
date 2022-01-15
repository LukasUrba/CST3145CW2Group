const express   = require("express");   // web framework
const path      = require("path");      // resources path handler
const cors      = require("cors")       // allow cross origin access
const http      = require("http");      // 

const urlModule = require("url");       // url sections handler
const router = express.Router();        // 
const statusCodes = require("../json/statusCodes.json");    // status codes collection

const app = express();                  // middlewares handler

// Sets up the path where your static files are
const publicPath = path.resolve(__dirname, "../public");    // public/static folder path
// Sends static files from the publicPath directory
app.use(express.static(publicPath));

app.use(cors());

// requestes monitor
app.use(function(request,response,next) {
    console.log("Request IP: " + request.ip);
	console.log("Request URL: " + request.url);
    console.log("Request date: " + new Date());
    next();
});

// var fs = require('fs');
// var obj = JSON.parse(fs.readFileSync('public/lessons.json', 'utf8'));


/* app.use(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Looks like you did not find a static file.");
});
 */
// lessons page
app.get("/lessons", function(request, response) {
    if      (!request.query.ajax)               response.sendFile(path.join(__dirname+'/../client/lessons.html'));
    else if (request.query.ajax === "lessons")	response.sendFile(path.join(__dirname+'/../json/lessons.json'));
    else                                        response.status(statusCodes.clientError.badRequest).end();
});
    
// User page
app.get("/user", function(request, response) {
    // response.render
    if		(!request.query.ajax)			response.sendFile(path.join(__dirname+'/../client/user.html'));
    else if (request.query.ajax === "user")	response.sendFile(path.join(__dirname+'/../json/user.json'));
    else                                    response.status(statusCodes.clientError.badRequest).end();
});

// page 404
app.use(function(request, response) {
    response.status(statusCodes.clientError.notFound);
    response.sendFile(path.join(__dirname+'/../client/404.html'));
});

//add the router
app.use('/', router);

// Starts the app on port 3000 and display a message when it’s started
app.listen(3000, console.log("App started on port 3000"));
