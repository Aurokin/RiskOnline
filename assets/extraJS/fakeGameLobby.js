$(document).ready(function() {
	console.log('hello');
});

io.socket.on('connect', function socketConnected() {

	console.log("This is from the connect: ", this.socket.sessionid);

});

io.socket.on('connection', function(socket){
		socket.on('hi', function(){
			data = { name: 'Test', message: 'Hi Too'};
			io.socket.emit('init', data);
		});
});
