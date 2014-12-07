io.socket.on('connect', function socketConnected() {
  gameID = parseInt($('#gameID').text());
  userID = parseInt($('#userID').text());

  io.socket.get("/games/"+gameID, function(resData, jwres) {
    console.log(resData);
    loadPlayers(resData);

    io.socket.get("/regions", function(regionsData, jwres) {
      loadRegions(resData, regionsData);
      loadInitialState(resData);
    });
  });

  io.socket.on('games', function gameDataReceived(message) {
    console.log(message);
    if (message.data.update == "region") {
      regionUpdate(message.data);
    }
  });


});

$(document).ready(function() {
  //Click Handlers
  //Place Army
  $('#placeArmyBtn').click(function() {
    var regionID = parseInt($('#regionID').text());
    var postData = {
      gameID : gameID,
      playerID : userID,
      army : 1,
      regionID : regionID
    }
    io.socket.post("/game/addTroops", postData, function (data, jwres) {
      console.log(data);
    });
  });
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
    currRegion.nameOrig = regionsData[i].name;
    currRegion.controlledBy = null;
    currRegion.controlledByName = null;
    currRegion.armyCount = null;
    regions[i] = currRegion;
    currRegion = {};
  }

  //Next Add resData Region Info To regions
  console.log(regions);
  //Then Draw Map With New Colors
}

function loadRegionInfo(name) {
  var result = $.grep(regions, function(e){ return e.name == name; });
  console.log(result);
  console.log(result[0].name);
  var cb = result[0].controlledByName;
  var armyCount = result[0].armyCount;
  if (cb == null) {
    cb = 'N/A';
  }
  if (armyCount == null) {
    armyCount = 'N/A';
  }
  $('#regionName').text(result[0].nameOrig);
  $('#regionCB').text(cb);
  $('#regionArmies').text(armyCount);
  $('#regionID').text(result[0].id);
  $('#regionNameDB').text(result[0].name);

  //Now Call Button Control
  modifyButton(result);
}

function loadInitialState(resData) {
  if (resData.currentUserTurn == userID) {
    //Its Players Turn
    if (resData.round == 0) {
      //Initial Placement Round
      phase = 0;
    }
  }
}

function updateRegionInfo(regionID) {
  var result = $.grep(regions, function(e){ return e.id == regionID; });
}

function modifyButton(region) {
  //Disable Buttons By Default
  $('#placeArmyBtn').addClass("disabled").prop("disabled", true);
  $('#moveArmyBtn').addClass("disabled").prop("disabled", true);
  $('#attackArmyBtn').addClass("disabled").prop("disabled", true);
  //Initial Phase Unclaimed Territory
  if (phase == 0 && region[0].controlledBy == null) {
    $('#placeArmyBtn').removeClass("disabled").prop("disabled", false);
  }
}

function regionUpdate(data) {
  if (data.status == 'create') {
    var regionID = data.region.region;
    var playerID = data.region.controlledBy;
    var region = $.grep(regions, function(e){ return e.id == regionID; });
    var player = $.grep(players, function(e){ return e.id == playerID; });
    var territory = region[0].name;
    var color = player[0].color;
    updateRegionInfo(regionID);
    recolorTerritory(territory, color)
  }
}
