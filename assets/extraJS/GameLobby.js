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
	var playerID = parseInt($('#userID').text());
	var playerName = $('#userName').text();
	var password = '';

	var postData = {
		gameID: gameID,
		playerID: playerID,
		password: password
	}

	console.log(postData);


	io.socket.post("/game/join", postData, function (data, jwres) {
		console.log('Posted');
		console.log(data);
		console.log(jwres);
	});
});
