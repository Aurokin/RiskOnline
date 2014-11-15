/*module.paths.push('/usr/local/lib/node_modules');//google suggested this would
																									//help with finding socket.io
*/
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var pg = require('pg');
var conString = "postgres://postgres:Password@localhost:1337/postgres"; //
var client = new pg.Client(conString);

client.connect();
//above is from a different guide about using psql with socket/node.js
var game = function(){

		var self = this;

		self.setupVariables = function(){
		  	self.ipaddress = process.env.IP_ADDRESS || '';
        self.port      = process.env.PORT || 1337;
		};

		self.terminator = function(){
			if (typeof sig === "string") {
           console.log('%s: Received %s - terminating game ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };

		 self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };

		self.initializeServer = function() {
        self.createRoutes();
        self.game = express();
        self.game.configure(function(){
          self.game.set('views', __dirname + '/views');
          self.game.set('view engine', 'ejs');
          self.game.use(express.bodyParser());
          self.game.use(express.methodOverride());
          self.game.use(express.cookieParser());
          self.game.use(express.session( {secret: 'rahasia'} ));
          self.game.use(stylus.middleware( {src: __dirname + '/assets', compile: function(str, path) {
                  return stylus(str).set('filename', path).use(nib());
              }
          } ));
          self.game.use(express.static(path.join(__dirname, 'assets')));
        });

        //  Add handlers for the game (from the routes).
        for (var r in self.routes) {
            self.game.get(r, self.routes[r]);
        }

				//next we should initialize the applciation
				self.initialize = function(){
						self.setupVariables();
						self.setupTerminationHandlers();
						// Create the express server and routes.
				  	self.initializeServer();
				};

				//now we should start up the server
				self.start = function(){
						  self.http = http.createServer(self.app).listen(self.port, self.ipaddress, function() {
            	console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now()), self.ipaddress, self.port);
        });
     };
	};

//main code should be housed here, according to the guide
var ngame = new game();
ngame.initialize();
ngame.start();

var io = socket.listen(ngame.http);

io.socket.on('connection', function(socket) {

		socket.on('mapclick', function(data){
				var pg = client.query(database.sql, database.region);
				pg.on('row', function(row){
						socket.broadcast.emit("mapclick", row);
				});
		});

    socket.on('checkassets', function (data) {
			if(pg = client.query(database.sql, database.region) < 100){
				console.log('hey you still have moves left.');
        var pg = client.query(database.sql, database.regions)
        console.log(data);
        socket.broadcast.emit("pgsql", data);
			}
    });

    socket.on('disconnect', function () {
        //disconnected users
    });

		socket.on('connection', function(){
			console.log('Hey, you are connected. Now what?');
		});
});

};

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

var io.listen(server);
*/

/*function handler (req, res){
	fs.readFile(__dirname + '/', function(err, data){
		if(err){
			console.log(err);
			res.writeHead(500);
			return res.end('Error loading map');
		}
		res.write
	});
}*/
