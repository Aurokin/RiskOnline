$(document).ready(function() {
	console.log('hello');
});

io.socket.on('connect', function socketConnected() {

	console.log("This is from the connect: ", this.socket.sessionid);

	
	io.socket.get('/getGamesList', function gotResponse(response) {
		console.log(response);
	});
	
	io.socket.get("/games", function(resData, jwres) {
		console.log(resData);
	});

	io.socket.on('Games', function notificationRecievedFromServer(message) {
		console.log(message);
	});

});