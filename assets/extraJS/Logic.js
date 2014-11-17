<SCRIPT LANGUAGE = "JavaScript">

var num_player=game.players.length;

//function that initialize the map
//calculate number of troops that each player can add
//make player add then push it on array and database
function init (){
	var num_troops = 120/num_player;
	//initialize map with same number of troops for each player
	for (var i=0 ; i < num_troops; i++){
		for(game.currentUserTurn ;game.currentUserTurn<num_player; game.currentUserTurn++){
			//calling object
			game.regions[//input].controlledBy=game.currentUserTurn;
			addTroops (game.currentUserTurn, game.regions[//input]);
		}
	}
}

//function that addtroops into territory
//check if territory is free or belong to that player
function addTroops (player, territory){  
	if(territoy.controlledBy==player){
		territory.armyCount++;
		//calling database to add troops into territory
	}
}
//player turn that do addTroops, attack and move
function turn (player_id){
	var num_troops = player_id.count_territory()/3;
	for (var i=0;i<num_troops;i++){
		addTroops( player_id, territory);
	}
	attack (player_id, from, to);
	move(player_id, from, to, number);
}

function attack(player, from, to){
	var random_num_dice1 = Math.floor(Math.random() * 6);
	var random_num_dice2 = Math.floor(Math.random() * 6);
	//check adj list territory 
	if (game.regions[from] > game.regions[to] && game.regions.controlledBy == player){
		if(random_num_dice1>random_num_dice2){
			game.regions[to].armyCount--;
		}
		else {
			game.regions[from].armyCount--;
		}
	}
	else {
		alert("You don't have enough troops!!!");
	}
}

function move (player, from, to , number){
//need add "and check" for adj list
	if(game.regions[to].armyCount ==0 && game.regions[from].armyCount>2 ){
		game.regions[to]+=number;
		game.regions[to].controlledBy=player;
		game.regions[from]-=number;
	}
	else {
		alert("You can't move to this territory");
	}
}

function finish_game (){
	while(!game.currentUserTurn.count_territory()==42){
		if(game.currentUserTurn==num_player){
			game.currentUserTurn=0;
			game.round++;
		}
		alert("It's " + player + "turn");
		turn(game.currentUserTurn);
		game.currentUserTurn++;
	}
}
</script>
