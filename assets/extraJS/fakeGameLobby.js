io.socket.on('connect', function socketConnected(){

	console.log("This is from the connect: ", this.socket.sessionid);

});

io.socket.get("/games", function(resData, jwres){

		console.log(resData);

});

io.socket.on('connection', function(socket){
	io.socket.emit('server-message', {message: 'Welcome!'});

	io.socket.on('user-message', function (data){

	})
})

io.socket.on('formData',
	function(data, fn){
		fn(true);
	});

io.socket.emit('formData',
	data,
	function(confirmation){
		console.log(confirmation);
});
