module.paths.push('/usr/local/lib/node_modules');

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var pg = require('pg-query');
var conString = "postgres://postgres:Password@localhost:1337/postgres"; //
var client = new pg.Client(conString);

client.connect();

var io = require('socket.io').listen(1337);

io.sockets.on('connection', function (socket) {
    socket.on('sql', function (data) {
        var pg = client.query(data.sql, data.values);
        pg.on('row', function(row) {
            socket.emit('sql', row);
        });
    });
});


/*Following logic is for my thinking purposes

	io.socket.on('connection', function(socket){
		socket.on('sql', function(data){
				var pg = client.pg(data.sql, data.values);
				pg.

	})
			send info to database to hold information on where resources are
			send this updated information to client
			check to see if it is the end of their turn
			if(not){
				allow them to distribute more resources
				update database
				check if they have made all moves available to them
					if(not){
							allow last distribution of resources
							update database
							update gamemap
							end their turn and send information to other players the new game map

				}
			else{
			end turn
			update gamemap
		}
		update all players game map, lock current players id so they cannot play again
		until others have played
		update their game map
		}
});

	on('disconnect', function(request, respond){

});
*/

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
