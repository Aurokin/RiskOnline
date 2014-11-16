
$(document).ready(function() {
	console.log('hello');
});


io.socket.on('connect', function socketConnected(){

	console.log("This is from the connect: ", this.socket.sessionid);
	io.socket.get('/getGamesList', function gotResponse(response){
		console.log(response);
	});
});



io.socket.get("/games", function(reData, jwres){

		console.log(reData);

});

io.socket.post("/games", {gameID: 'socket.sessionid'}, function(redata){

	console.log(reData);

});

io.socket.on('Games', function notificationRecievedFromServer(message) {

		console.log(message);

});

io.socket.on("/users", function(reData, jwres){

		console.log(reData);

});
