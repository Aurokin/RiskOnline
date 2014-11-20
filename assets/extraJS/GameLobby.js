io.socket.on('connect', function socketConnected() {

	io.socket.get("/games", function(resData, jwres) {
		console.log(resData);
	});

	io.socket.on('games', function notificationRecievedFromServer(message) {
		console.log(message);
	});


});

$('.joinGame').click(function() {
	//console.log(this);
	//console.log(this.getAttribute("value"));

	var gameID = this.getAttribute("value");
	var playerID = session.user;
	var playerName = session.name;

	var data = {
		gameID: gameID,
		playerID: playerID,
		password: password
	}

	console.log(data);


	io.socket.post("http://localhost:1337/game/join", data, function (data, jwres) {
		console.log('Posted');
		console.log(data);
		console.log(jwres);
	});
});
