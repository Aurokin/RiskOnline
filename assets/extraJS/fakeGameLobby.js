$(document).ready(function() {
	console.log('hello');
});

io.socket.on('connect', function socketConnected() {

	console.log("This is from the connect: ", this.socket.sessionid);

});

io.socket.on('connect', function(socket){
		socket.emit('greeting', 'Hello');
		setInterval(5000, function(data){
			var uid = data['uid'];
			var q = "SELECT * FROM users";
			connection.query(q, function(err, rows, fields){
				if(err) throw err;
				if(row[0].userID = userID){
					socket.emit('new_message', rows[0]);
					userID = rows[0].id
				}
			});
		});
	});
