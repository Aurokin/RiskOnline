var pg = require("pg");
var conString = "pg://admin:guest@localhost:1337/Database";

var client = new pg.Client(conString);

client.connect();

var query = client.query("SELECT gameID FROM games");
query.on("row", function(row, result){
	result.addRow(row);
});

query.on("end", function(result){
	console.log(JSON.stringify(result.rows, null, " "));
	client.end();

});

$(document).ready(function() {
	console.log('hello');
});

io.socket.on('connect', function socketConnected(){

	console.log("This is from the connect: ", this.socket.sessionid);

});

io.socket.post("/games", function(reData, jwres){

		console.log("This is from socketpost: ", reData);
		var query = client.query("SELECT gameID FROM games");
		query.on("row", function(row, result){
			result.addRow(row);
		});

});
