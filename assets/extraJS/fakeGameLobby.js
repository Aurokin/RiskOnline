io.socket.on('connect', function socketConnected(){
	io.socket.emit('server-message', {message: 'Welcome!'});
	console.log("This is from the connect: ", this.socket.sessionid);

});

io.socket.get("/Games", function(resData, jwres){

		console.log(resData);

});

/*io.socket.on('formData',
	function(data, fn){
		fn(true);
	});

io.socket.emit('formData',
	data,
	function(confirmation){
		console.log(confirmation);
});*/

var server = require('http').createServer();
app.set('port', process.env.PORT || 1337);
var io = require('socket.io')(server);
io.on('connection', function(socket){
	socket.on('event', function(data){});
	socket.on('disconnect', function(){});
});
server.listen(app.get('port'));
