$(document).ready(function() {
  var isFull = $('#isFull').text();
  console.log('Is Full: '+isFull);

  if (isFull == 'true') {
    console.log('Start Game');
  }
});

io.socket.on('connect', function socketConnected() {
  var gameID = parseInt($('#gameID').text());
  console.log(gameID);
  io.socket.get("/gameState?gameID=1", function(resData, jwres) {
    console.log(resData);
  });
});
