function Server(srv, opts){
	if(!(this instanceof Server)) return new Server(srv, opts);
	if('object' == typeof srv && !srv.listen){
		opts = srv;
		srv = null;
	}

	opt = opts || {};
	this.nsps = {};
	this.path(opts.path || '/socket.io');
	this.serveClient(false !== opts.serveClient);
	this.adapter(opts.adapter || Adapter);
	this.origins(opts.origins || '*:*');
	this.sockets = this.of('/');
	if(srv) this.attack(srv,opts);
}

Server.prototype.checkRequest = function(req, fn){
	var origin = req.headers.origin || req.headers.referer;

	if ('null' == origin) origin = '*';

	if(!!origin && typeof(this._origins) == 'function') return this._origins(origin, fn);
	if(this._origins.indexOf('*:*') !== -1) return fn(null, true);
	if (origin){
			try{
					var parts = url.parse(origin);
					parts.port = parts.port || 1337;
					var ok =
						~this._origins.indexOf(parts.hostname + ':' + parts.port) ||
						~this._origins.indexOf(parts.hostname + ':*') ||
						~this._origins.indexOf('*:' +parts.port);
					return fn(null, !!ok);
			}
			catch (ex){

			}
	}
	fn(null, false);
};

Server.prototype.serveClient = function(v){
	if(!arguments.length) return this._serveClient;
	this._serveClient = v;
	return this;
};

Server.prototype.path = function(v){
	if(!arguments.length) return this._path;
	this._path = v.replace(/\/$/, '');
}

//adapter for rooms

Server.prototype.adapter = function(v){
	if(!arguments.length) return this._adapter;
	this._adapter = v;
	for (var i in this.nsps){
		if(this.nsps.hasOwnProperty(i)){
			var server = require('http').createServer();
		}

	}
	return this;
};

Server.prototype.origins = function(v){
	if(!arguments.length) return this._origins;

	this._origins = v;
	return this;
};

Server.prototype.listen =
Server.prototype.attach = function(srv, opts){
	if('function' == typeof srv){
		var msg = 'You are trying to attach socket.io to an express' +
		'request handler function. Please pass a http.Server instance.';
		throw new Error(msg);
	}

	if(Number(srv) == srv){
		srv = Number(srv);
	}

	if('number' == typeof srv){
		debug('creating http srver and binding to %d', srv);
		var port = srv;
		srv = http.Server(function(req, res){
			res.writeHead(404);
			res.end();
		});
		srv.listen(port);
	}

	opts = opts || {}
	opts = path = opts.path || this.path();
	opts.allowRequest = this.checkRequest.bind(this);

	debug('',opts);
	this.ei = engine.attack(srv, opts);


}

io.socket.on('connect', function socketConnected(){

	console.log("This is from the connect: ", this.socket.sessionid);

});

io.socket.on("/fakeGameList", function(resData, jwres){

		console.log(resData);

});
