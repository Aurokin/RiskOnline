<<<<<<< HEAD
<<<<<<< HEAD
<script src="/socket.io/socket.io.js"></script>
=======
>>>>>>> lda7d7_sprint1

<script src="/socket.io/socket.io/js"></script>

<script>
	var socket = io.connect('http://localhost');  
	socket.on('news', function (data) {
    	console.log('a user connected');
	console.log(data);
    	socket.emit('my other event', { my: 'data' });
  	});
	socket.on('disconnect', function(){
	console.log('a user disconnected');
	});
	socket.on('chat message', function(msg){
	console.log('message: ' + msg);
	});
</script>
=======
	var io = require('socket.io');
        var socket = io.connect('http://localhost');
        socket.on('news', function (data) {
        console.log('a user connected');
        console.log(data);
        socket.emit('my other event', { my: 'data' });
        });
        socket.on('disconnect', function(){
        console.log('a user disconnected');
        });
        socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        });

>>>>>>> lda7d7_sprint2
