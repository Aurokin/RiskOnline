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

io.socket.on('connect', function socketConnected(){

	console.log("This is from the connect: ", this.socket.sessionid);

});

io.socket.on("/fakeGameList", function(resData, jwres){

		console.log(resData);

});
