
$(document).ready(function() {
	console.log('hello');
});

io.socket.on('connect', function socketConnected(){

	console.log("This is from the connect: ", this.socket.sessionid);

	io.socket.on('myevent', function(){
		console.log('"myEvent" event received');
	});

});

io.socket.post("/games", function(reData, jwres){

		console.log("This is from socketpost: ", reData);

});

io.socket.on("/Games", function notificationRecievedFromServer(message) {

		console.log(message);

});

io.socket.on("/users", function(reData, jwres){

		console.log(reData);

});
