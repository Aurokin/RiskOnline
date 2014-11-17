var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

server = http.createServer(function(req, res){
	//our personal server will go here
	var path = url.parse(req.url).pathname;
		fs.readFile(__dirname + path, function(err, data){
				if (err) return send404(res);
				res.write('Stuff is working!\n');
				res.writeHead(200, {'Content-Type' : path == 'json.js' ? 'text/javascript' : 'text/html'});
				res.write(data, 'utf8');
				res.end();
		});
		//break;

	//default: send404(res);

	}
),

app.get('/', function(req, res){
        res.sendFile(__dirname + '/real_time.ejs');

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

      	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
	});

          socket.on('chat message', function(msg){
                io.emit('chat message', msg);
                });
});
});

http.listen(1337, function(){
        console.log('lisening on *:1337');
});
