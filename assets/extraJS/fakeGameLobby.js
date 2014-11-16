$(document).ready(function() {
	console.log('hello');
});

io.socket.on('connect', function socketConnected() {

	console.log("This is from the connect: ", this.socket.sessionid);

});

io.socket.get("/games", function(reData, jwres){

		console.log(reData);

});

io.socket.on('Games', function notificationRecievedFromServer(message) {

		console.log(message);

});
