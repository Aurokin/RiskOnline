$(document).ready(function() {
	console.log('hello');
});

io.socket.on('connect', function socketConnected() {

	console.log("This is from the connect: ", this.socket.sessionid);

});

io.socket.get("/fakeGameLobby", function(reData, jwres){

		console.log(reData);

});

.publishAdd( {id},attribute, idAdded, [request], [options] )
