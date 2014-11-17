io.socket.on('connect', function socketConnected(){

	console.log("This is from the connect: ", this.socket.sessionid);

});

io.socket.on("/games", function(resData, jwres){

		console.log(resData);

});

io.socket.on('disconnect', function(){
	this.onclose('forced server close');
}
