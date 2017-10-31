//make connection, not required for socet.io 2.0
// var socket = io.connect("http://localhost:3000");
var socket = io();

//Query DOM. use jquery instead
var message = $("#message"), 
	handle = $("#handle"), 
	btn = $("#send"), 
	feedback = $("#feedback"),
	output = $("#output");

//Emit events
btn.on('click', function(){
	socket.emit("chat", {
		message: message.val(),
		handle : handle.val()
	});
});

//add a keypress event
message.keypress(function() {
	socket.emit("typing", handle.val());
});


//listen for events from server
socket.on("chat", function(data) {
	// console.log("got a text");
	//clear the "typing" event from feedback element
	feedback.html("");

	output.append("<p><strong>" + data.handle + ": </strong>" + data.message + "</p>");

	//clear handle and message input box
	handle.val("");
	message.val("");
});

socket.on("typing", function(data) {
	feedback.html('<p><em>' + data + ' is typing a message...' + '</em></p>');
});

