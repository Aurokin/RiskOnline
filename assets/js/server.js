module.paths.push('/usr/local/lib/node_modules');

var http = require("http");
var url = require('url');
var fs = require('fs');
var pg = require('pg');

var conString = "tcp://user:password@localhost:5432/db"; //
var client = new pg.Client(conString);
client.connect();

var io = require('socket.io').listen(1337);

io.sockets.on('connection', function (socket) {
    socket.on('sql', function (data) {
        var query = client.query(data.sql, data.values);
        query.on('row', function(row) {
            socket.emit('sql', row);
        });
    });
});

//Following lines are a simple server I was trying to make function;
//however, something was conflicting in the module under config and
//I was unsure what I should change so I decided to not continue,
//instead this code is left if anyone should have any idea how to test/fix
//the issues.
//-Summer

/*var server = http.createServer(function(request, response){
	console.log('Connection');
	var path = url.parse(request.url).pathname;

	switch(path){
		case '/':

			response.writeHead(200, {'Content-type': 'text/html'});
			response.write('hello world');
			break;

		case 'map.html':

			fs.readFile(__dirname + path, function(error, data){
				if (error){
					response.writeHead(404);
					response.write("opps this doesn't exist - 404");
				}

				else{
					response.writeHead(200, {"Content-Type": "text/html"});
					response.write(data, "utf8");
				}
			});
		break;

		default:
			response.writeHead(404);
			response.write("opps this doesn't exist - 404");
			break;
	}
	response.end();
});

server.listen(1337);

var io.listen(server);*/
