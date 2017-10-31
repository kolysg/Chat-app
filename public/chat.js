//make connection, not required for socet.io 2.0
// var socket = io.connect("http://localhost:3000");
var socket = io();

//Query DOM. use jquery instead
var message = $("#message"), 
	handle = $("#handle"), 
	btn = $("#send"), 
	output = $("#output");

//the value can be retrieved using id.value

//Emit events
btn.on('click', function(){
	socket.emit("chat", {
		message: message.val(),
		handle : handle.val()
	});
});

//listen for events from server
socket.on("chat", function(data) {
	console.log("got a text");
	output.append("<p><strong>" + data.handle + ": </strong>" + data.message + "</p>");
})

