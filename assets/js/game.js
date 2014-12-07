io.socket.on('connect', function socketConnected() {
  var gameID = parseInt($('#gameID').text());

  io.socket.get("/games/"+gameID, function(resData, jwres) {
    console.log(resData);
  });

  io.socket.on('games', function gameDataReceived(message) {
    console.log(message);
  });
});

$(document).ready(function() {

});
