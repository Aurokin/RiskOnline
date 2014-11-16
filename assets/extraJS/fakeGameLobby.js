$(document).ready(function() {
	console.log('hello');
});

io.socket.on('connect', function socketConnected() {

	console.log("This is from the connect: ", this.socket.sessionid);

	socket.get(‘/user/welcome’, function gotResponse () {
    // we don’t really care about the response
  });

});

io.socket.on('connect', function socketConnected(){

});

 welcome: function (req, res) {
    // Get all of the users
    region.find().exec(function (err, region) {
      // Subscribe the requesting socket (e.g. req.socket) to all users (e.g. users)
      region.subscribe(req.socket, region);
    });
  }
