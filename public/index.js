var express = require("express");

//App setup
var app = express();

//server
var server = app.listen(3000, function() {
	console.log("Listen to request on port 3000");
});

//static files
app.use(express.static('public'));







