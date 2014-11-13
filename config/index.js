/* I believe this is right-ish? */

var express = require('express');
var path = require('path');
var app = express();
var risk = require('./risk.js');

app.configure(function() {
    // Turn dwn the logging activity
    app.use(express.logger('dev'));

    // Serve static html, js, css, and image files from the 'public' directory
    app.use(express.static(path.join(__dirname,'public')));
});

var server = require('http').createServer(app).listen(1337);

var io = require('socket.io').listen(server);

// Reduce the logging output of Socket.IO
io.set('log level',1);

// Listen for Socket.IO Connections. Once connected, start the game logic.
io.sockets.on('connection', function (socket) {
    console.log('client connected');
    risk.initGame(io, socket);
});
