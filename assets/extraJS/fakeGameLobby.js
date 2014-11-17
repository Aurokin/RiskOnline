io.socket.on('connect', function socketConnected(){

	console.log("This is from the connect: ", this.socket.sessionid);

});

io.socket.get("/games", function(reData, jwres){

		console.log(reData);

});

getRoomsList: function(req, res) {
		var roomNames = JSON.stringify(sails.sockets.rooms());
		res.json({
			message: 'A list of all the rooms: '+roomNames
		});
}

sails.sockets.subscribers('supportchat');
