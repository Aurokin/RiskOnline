io.socket.on('connect', function socketConnected() {
	
	io.socket.get("/games", function(resData, jwres) {
		console.log(resData);
	});

	io.socket.on('games', function notificationRecievedFromServer(message) {
		console.log(message);
	});

});