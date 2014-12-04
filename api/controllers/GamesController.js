/**
* GamesController
*
* @description :: Server-side logic for managing Games
* @help        :: See http://links.sailsjs.org/docs/controllers
*/

module.exports = {
	gameState: function (req, res) {
		//Will Report Game, Players, Regions
		//Requires GET with gameID
		var gameID = req.query.gameID;


		Games.findOne({	 id: gameID}).populate('regions').populate('players').then(function(game){

			/*
			http://stackoverflow.com/questions/23446484/sails-js-populate-nested-associations
			var regions = Region.find({id: _.pluck(game.regions, 'region')
		}).then(function(regions) {
		return regions;
	});
	return [game, players, regions];
	*/

	return [game];
}).spread(function (game) {
	/*
	var regions = _.indexBy(regions, 'id');
	game.regions = _.map(game.region, function(region) {
	region.region = regions[region.region];
});*/
return res.json(game)
}).catch(function (err){
	console.log(err);
	return res.json({
		gameState: 'WIP'
	});
});
},

initMap : function (req, res) {

	console.log(req.body);

},

addTroops : function (req , res){

	console.log(req.playerName);
	console.log(req.TerritoryName);
	return;
	/*	var user = req.body.username;
	var regionID = req.body.regionID;

	Game.get({id: gameId}, function(game){

	if (ControlledBy == username){



}

});

Games.publishUpdate(game.id, game);
return res.json(game);*/
},

attack : function (req, res){



},

move : function (req, res) {



},

startGame: function (req, res) {
	//Starts Game
	//Requires gameID

	var gameID = req.body.gameID;
	console.log('Starting Game #'+gameID);

	Games.findOne(gameID).exec(function(err, game) {
		if (err) {
			console.log(err);
		}

		game.inProgress = true;
		game.save(function(err) {
			//console.log(err);
			Games.publishUpdate(game.id, game);

			return res.json(game);
		})
	})
},


gamesList: function (req, res) {
	Games.find().exec(function (err, games) {
		Games.subscribe(req.socket, games);
		return res.json({
			games: games
		});
	});
	Games.publishUpdate(games);
},

increaseRound: function (req, res) {
	/*	var gameID = req.body.gameID;

	Games.findOne(gameID).exec(function(err, game) {
	if (err) {
	console.log(err);
}
else {
//Games.publishUpdate(game);
return res.json(game);
}
})
*/
},

endGame: function (req, res) {
	/*summer */
	var gameID = req.body.gameID;
	var playerID = req.body.playerID;

	Games.findOne(gameID).exec(function(err, gameID){
		Games.destroy(gameID).exec(function(err){
			Games.publishDestroy(gameID);
		});
	});

	/*hopefully we can take the logic from here*/
},

addPlayer: function (req, res) {
	//Will Add Player To Game
	//Requires POST with gameID / playerID

	var gameID = req.body.gameID;
	var playerID = req.body.playerID;

	Games.findOne(gameID).exec(function(err, game) {

		if (err) {
			//console.log('first stop');
		}
		game.players.add(playerID);

		game.save(function(err) {
			//console.log('second stop');
			//console.log(err);

			Games.findOne(gameID).populate('players').exec(function(err, game){

				Games.publishUpdate(game.id, {
					id: game.id,
					update: 'player',
					status: 'add'

				});

				return res.json(game);
			});
			//Error goes Here
		});
	});
},

removePlayer: function (req, res) {
	//Will Remove Player From Game
	//Requires POST with gameID / playerID
	var gameID = req.body.gameID;
	var playerID = req.body.playerID;

	Games.findOne(gameID).exec(function(err, game) {

		if (err) {

		}

		game.players.remove(playerID);

		game.save(function(err) {
			//console.log('second stop');
			//console.log(err);

			Games.findOne(gameID).populate('players').exec(function(err, game){

				Games.publishUpdate(game.id, {
					id: game.id,
					update: 'player',
					status: 'remove'
				});

				return res.json(game);
			});
		});
	});
},

joinGame: function (req, res) {
	//Requires GameID, PlayerID, Password
	var gameID = req.body.gameID;
	var playerID = req.body.playerID;
	var password = req.body.password;
	//var roomName = 'game'+gameID+'info';

	/*
	console.log('gameID: '+gameID);
	console.log('playerID: '+playerID);
	console.log('password: '+password);
	console.log(typeof playerID);
	*/

	//Error Out For Invalid Player ID / Game ID
	if (typeof playerID === 'object' || typeof gameID === 'object') {
		return res.send('Invalid Player Or GameID');
	}

	Games.findOne(gameID).populate('players').exec(function(err, game) {

		if (err) {
			console.log(err);
		}

		/*
		console.log(game);
		console.log(password);
		console.log(game.password);
		*/

		//Make Sure Password Is Correct
		if (game.password == password || game.password == null) {
			//Make Sure Lobby Isn't Full
			if (game.players.length < game.numPlayers) {

				//Should only add if it does not already exist
				//Incomplete
				game.players.add(playerID);



				game.save(function(err) {
					var status = {join: true, full: false};
					//If the Lobby Is Full
					if (game.players.length + 1 == game.numPlayers) {
						status.full = true;
					}

					//Maybe message isn't needed, just publishUpdate
					Games.publishUpdate(game.id, {player: 1});

					//.subscribe maybe not necesscary?
					Games.subscribe(req.socket, game.id, ['message']);
					Games.message(game.id, {id: gameID, playerID: playerID, status: 'add'}, req.socket);

					/*sails.sockets.join(req.socket, roomName);
					//Should Emit Player Name Later
					sails.sockets.emit(roomName, 'playerJoined', {
					playerID: playerID
				});
				console.log(sails.sockets.rooms());*/
				return res.send(status);
			});

		}
		else {
			return res.send('Game Is Full');
		}
	}
	else {
		return res.send('Password Incorrect');
	}

	});
},

enterLobby: function (req, res) {
	var gameID = req.query.gameID;
	var playerID = req.session.user;
	var isFull = 'false';
	var match = 'false';
	//var roomName = req.param('game'+gameID+'info');

	if (typeof playerID === 'undefined') {
		return res.view('static/error', {error: 'PlayerID Is Not Logged In'});
	}

	//Find Game
	Games.findOne(gameID).populate('players').exec(function(err, game) {
		//Error Check
		if (err) {
			return res.view('static/error', {error: err});
		}

		//console.log('numPlayers: '+game.numPlayers);
		//console.log('players in game: '+game.players.length);

		//Check If Game Is Full
		if (game.numPlayers == game.players.length) {
			isFull = 'true';
		}

		game.players.forEach(function (player, index, array) {
			//console.log('Player ID: '+player.id+' - Player ID: '+playerID);
			//console.log(typeof player.id+' - '+typeof playerID);
			//Ensure Player Is In Game
			if (player.id == playerID) {
				//console.log('Match');
				match = 'true';
			}
		});

		if (match == 'true') {
			//sails.sockets.join(req.socket, roomName);
			return res.view('static/gamelobby', {isFull: isFull, gameID: gameID});
		}
		else {
			return res.view('static/error', {error: 'Player Not In Game'});
		}
		Games.publishUpdate(games);

	});
},

changeTurn: function (req, res) {

	var gameID = req.body.gameID;
	var playerID = req.body.playerID;
	var playerIDs = [];
	var currentIndex;
	var newRound = false;

	Games.findOne(gameID).populate('players').exec(function(err, game){

		if (err) {
			console.log(err);
			res.send('Game Not Found With Given ID');
		}

		//console.log(game);

		//If (game.round == 0 && game.startArmies > 0) Then Initial Map Logic

		if(playerID == game.currentUserTurn) {

			game.players.forEach(function (player, index, array) {
				playerIDs.push(player.id);
			});

			currentIndex = playerIDs.indexOf(parseInt(playerID));

			/*
			console.log(currentIndex);
			console.log(playerIDs[currentIndex + 0]);
			console.log(playerIDs[currentIndex + 1]);
			console.log(playerIDs[currentIndex + 2]);
			*/

			if (typeof playerIDs[currentIndex + 1] === 'undefined') {
				console.log('Change Round, Reset To First Player');
				game.currentUserTurn = playerIDs[0];
				newRound = true;
				game.round = game.round + 1;

				if (currentIndex == 0) {
					console.log('Declare Winner');
				}
			}
			else {
				game.currentUserTurn = playerIDs[currentIndex+1];
			}

			console.log(playerIDs);

			//Change Turn

			game.save(function(err){
				//emit new players turn
				Games.publishUpdate(game.id, {
					id: game.id,
					playerID: game.currentUserTurn,
					update: 'changeTurn'
				});

				if (err) {
					console.log(err);
					res.send('Database Was Not Able To Save Change');
				}

				if (newRound == true) {
					//Emit New Round Message
					Games.publishUpdate(game.id, {
						id: game.id,
						round: game.round,
						update: 'changeRound'
					});
				}
				res.send(game);
			});
		}

		else {
			res.send('It Is Not Players Turn');
		}
		//if yes then move turn back to player one
		//update gamestate
	});
}

};
