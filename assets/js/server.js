$("go").click(function(){
  socket.post("/game/addTerritory", userID, troops, regionID);
}, function(res, info{
  $("region.id.owner").find("army count").text(resp.value)
});
});
