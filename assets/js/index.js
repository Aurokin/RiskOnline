var http = require('http')
, url = require('url')
, fs = require('fs')
, server;

server = http.createServer(function(req, res){
	//our personal server will go here
	var path = url.parse(req.url).pathname;
	switch(path) {
		case '/':
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write('Stuff is working!\n');
			res.end();
			break;
		case '/map.html':
			fs.readFile(__dirname + path, function(err, data){
				if (err) return send404(res);
				res.write('Stuff is working!\n');
				res.writeHead(200, {'Content-Type' : path == 'json.js' ? 'text/javascript' : 'text/html'})
				res.write(data, 'utf8');
				res.end();
		});
		break;
	default: send404(res);
		
	}
}),

send404 = function(res) {
	res.writeHead(404);
	res.write('404');
	res.end();
};

server.listen(8080);

//socket.io
var io = require('/Users/Summer/Documents/Workspace/cs4320-groupdanny/node_modules/sails/node_modules/socket.io').listen(server);

//on a 'connection' event

io.sockets.on('connection', function(socket) {
	console.log("Connection " + socket.id + " accepted.");

	//define event handlers

	socket.on('message', function(message) {
		console.log("Received message: " + message + " - from client " + socket.id);
	});

	socket.on('disconnect', function() {
		console.log("Connection " + socket.id + " terminated.");

	});
});
