io.socket.on('connect', function socketConnected() {
  gameID = parseInt($('#gameID').text());
  userID = parseInt($('#userID').text());

  io.socket.get("/games/"+gameID, function(resData, jwres) {
    console.log(resData);
    loadPlayers(resData);

    io.socket.get("/regions", function(regionsData, jwres) {
      loadRegions(resData, regionsData);
      if (resData.currentUserTurn == userID) {
        //Its Users Turn Load UI
      }
    });
  });

  io.socket.on('games', function gameDataReceived(message) {
    console.log(message);
  });


});

$(document).ready(function() {

});

function recolorTerritory(territory, color) {
  Risk.Territories[territory].path.setFill(color);
  Risk.Territories[territory].path.setOpacity(0.4);
  Risk.mapLayer.draw();
}

function loadPlayers(resData) {
  colors = ['#36FF7C', 'FF36B9', '#52A3FF', '#FFAE52', '#E8FF52'];
  players = [];
  var currPlayer = {};
  for (i = 0; i < resData.players.length; i++) {
    currPlayer.id = resData.players[i].id;
    currPlayer.name = resData.players[i].name;
    currPlayer.color = colors[i];
    players[i] = currPlayer;
    currPlayer = {};
  }

  //console.log(players);
}

function loadRegions(resData, regionsData) {
  //console.log(resData);
  //console.log(regionsData);
  regions = [];
  var currRegion = {};

  for (i = 0; i < regionsData.length; i++) {
    //console.log(regionsData[i]);
    currRegion.id = regionsData[i].regionID;
    currRegion.name = regionsData[i].name.replace(/\s+/g, '');
    currRegion.controlledBy = null;
    currRegion.armyCount = null;
    regions[i] = currRegion;
    currRegion = {};
  }

  //Next Add resData Region Info To regions
  console.log(regions);
  //Then Draw Map With New Colors
}
