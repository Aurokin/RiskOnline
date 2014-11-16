$(document).ready(function() {
	console.log('hello');
});

io.socket.on('connect', function socketConnected(){

	console.log("This is from the connect: ", this.socket.sessionid);

});

io.socket.post("/games", function(reData, jwres){

		console.log(reData);
		response.writeHead(200, {'Content-Type': 'text/javascript'});
		response.write(reData);
		response.end();
});
