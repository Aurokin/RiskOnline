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
    console.log(resData.players);
    resData.players.forEach(function (player, index, array) {
      console.log(player);
      $('#rightGL').append('<p id="player'+player.id+'">'+player.name+'</p>');
    });
  });

  io.socket.get("/games/1", function(resData, jwres) {
    console.log(resData);
  });

  io.socket.on('games', function playerJoinedGame(message) {
    console.log(message);
  });

});
