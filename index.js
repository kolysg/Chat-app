var express = require("express");
var socket = require('socket.io');

var $ = require("jquery");

//App setup
var app = express();

//server setup
var server = app.listen(3000, function() {
	console.log("Listen to request on port 3000");
});

//Static Files
app.use(express.static('public'));

//use socket.io
//install in both backend and frontend
//setup socket
var io = socket(server);

//every time a new connection is made, as in the param socket
io.on("connection", function(socket) {
	console.log("A new connection is made:" + socket.id);

	//listen for that message sent to us by client
	socket.on("chat", function(data) {
		// io.sockets.emit()
		//emit to all clients open, io.emit would do that in socket.io 2.0
		io.emit("chat", data);
	});

	//broadcast 'typing' message
	//In order to send an event to everyone, use io.emit
	//If you want to send a message to everyone except for a certain socket, use broadcast flag 
	socket.on("typing", function(data) {
		//broadcast this to every single socket connection 
		socket.broadcast.emit("typing", data);
	})

});

