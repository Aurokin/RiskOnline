var numPlayers = [];

io.socket.on('currentGame', function(Game){
	socket.clientname = Game;
		inprogress.push(numPlayers);
	io.socket.emit('added', numPlayers,Game)
});.


io.socket.on('connect', function socketConnected(){

	console.log("This is from the connect: ", this.socket.sessionid);

});

io.socket.post("/games", function(reData, jwres){

		console.log(reData);

});
