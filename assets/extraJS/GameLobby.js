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
	console.log($('#userID').text());

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
		if (data.join == true) {
			window.location.href = 'http://localhost:1337/game?gameID='+gameID;
		}
	});
});
