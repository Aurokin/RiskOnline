$(document).ready(function() {
	console.log('hello');
});

io.socket.on('connect', function socketConnected() {

	console.log("This is from the connect: ", this.socket.sessionid);
	
	io.socket.get("/games", function(resData, jwres) {
		console.log(resData);
	});

	io.socket.on('games', function notificationRecievedFromServer(message) {
		console.log(message);
	});

});