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

		//get game and playerID
		var gameID = req.body.gameID;
		var playerID = req.body.playerID;
		var army = parseInt(req.body.army);
		var regionID = req.body.regionID;

		//find game
		Games.findOne(gameID).populate('players').exec (function (err,game){
			if(err){
				//console.log(err);
				res.send('Game Not Found With Given ID');
			}
			if(playerID == game.currentUserTurn){
				Region.findOne({game : gameID, region : regionID}).exec(function(err, region) {
					if (err) {
						res.send('Region Not Found');
						//console.log('Not found region');
					}

					if (typeof region === 'undefined') {
						//Region Doesn't Exist
						//Give Region To Player
						Region.create({game: gameID, region : regionID, armyCount : army, controlledBy : playerID}).exec(function(err,newRegion){
							if(err){
								//console.log(err);
								res.send('Could Not Create Region');
							}
							Games.publishUpdate(gameID, {id: gameID, update: 'region', status: 'create', region: newRegion, armyCount: army});
							//res.send(newRegion);
							res.send('New Region Created');
						});
					}
					else {
						//Region Exists, Check If Belong To Player
						//If So Add Troops To Region
						if (region.controlledBy == playerID) {
							region.armyCount = region.armyCount + army;
							region.save(function(err) {
								if (err) {
									res.send('Region Could Not Be Added');
								}
								Games.publishUpdate(gameID, {id: gameID, update: 'region', status: 'add', region: region, armyCount: army});
								//res.send(region);
								res.send('Army Added To Region');
							});
						}
						else {
							return res.send('Region Not Controlled By Player');
						}
					}
				});
			}
		});
	},

	attack : function (req, res){



	},

	move : function (req, res) {
		var gameID = req.body.gameID;
		var playerID = req.body.playerID;
		var armyMove = parseInt(req.body.armyMove);
		var regionIDFrom = req.body.regionIDFrom;
		var regionIDTo = req.body.regionIDTo;
		var regionFrom;
		var regionTo;
		Games.findOne(gameID).populate('players').exec(function(err,game){
			if(err){
				res.send('Game Not Found With Given ID');
			}
			if(playerID == game.currentUserTurn){
				Region.find({game : gameID, region: [regionIDFrom, regionIDTo], controlledBy: playerID}).exec(function(err, regions) {
					if (err) {
						res.send('Region Not Found');
					}
					if(regions.length==2){
						//Do logic here
						if (regions[0].region == regionIDFrom) {
							regionFrom = 0;
							regionTo = 1;
						}
						else {
							regionFrom = 1;
							regionTo = 0;
						}
						if(regions[regionFrom].armyCount > 1 ){
							if (regions[regionFrom].armyCount - 1 < armyMove) {
								armyMove = regions[regionFrom].armyCount - 1;
							}
							regions[regionFrom].armyCount = regions[regionFrom].armyCount - armyMove;
							regions[regionTo].armyCount = regions[regionTo].armyCount + armyMove;

							regions[regionFrom].save(function(err) {
									if (err) {
										res.send(err);
									}
									Games.publishUpdate(gameID, {id: gameID, update: 'region', status: 'remove', amount: armyMove, regionID: regionIDFrom});

									regions[regionTo].save(function(err) {
										if (err) {
											res.send(err);
										}
										Games.publishUpdate(gameID, {id: gameID, update: 'region', status: 'add', amount: armyMove, regionID: regionIDTo});
										res.send(regions);
									});
							});
						}
						else {
							res.send('Player Not Have Enough Troop To Move');
						}
					}
					else{
						res.send('Region Not Belong Player');
					}
				});
			}
		});
	},

	startGame: function (req, res) {
		//Starts Game
		//Requires gameID

		var gameID = req.body.gameID;
		//console.log('Starting Game #'+gameID);

		Games.findOne(gameID).exec(function(err, game) {
			if (err) {
				console.log(err);
				return res.send('Game Not Found');
			}

			game.inProgress = true;
			game.save(function(err) {
				//console.log(err);
				Games.publishUpdate(game.id, {
					id: game.id,
					update: 'inProgress',
					status: 'true'
				});

				return res.send('Game Started');
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

	endGame: function (req, res) {

		var gameID = req.body.gameID;
		var playerID = req.body.playerID;

		Games.findOne(gameID).exec(function(err, gameID){

			if(game.numPlayers < 2){

				//game.players.remove(playerID);

				Games.publishUpdate(gameID,{
					id: game.id,
					winner: 'playerID',
					status: 'complete',
					endDate: 'values.startDate = new Date().toISOString()',
				})

			}


			game.players.remove(playerID);

			Games.destroy(gameID).exec(function(err){
				Games.publishDestroy(gameID);

			});
		});
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

					if (parseInt(playerID) < game.currentUserTurn) {
						game.currentUserTurn = parseInt(playerID);
					}

					game.save(function(err) {
						var status = {join: true, full: false};
						//If the Lobby Is Full
						if (game.players.length + 1 == game.numPlayers) {
							status.full = true;
						}

						//Maybe message isn't needed, just publishUpdate
						Games.publishUpdate(game.id, {id: gameID, playerID: playerID, status: 'add'});

						//.subscribe maybe not necesscary?
						Games.subscribe(req.socket, game.id);

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

				if (game.inProgress == true) {
					return res.view('map', {gameID: gameID});
				}

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
					//console.log('Change Round, Reset To First Player');
					game.currentUserTurn = playerIDs[0];
					newRound = true;

					if (currentIndex == 0) {
						console.log('Declare Winner');
					}
				}
				else {
					game.currentUserTurn = playerIDs[currentIndex+1];
				}

				if(game.startingArmies == 1){

					game.startingArmies = 0;
					game.phase = 1;

				}

				if (game.round == 0 && game.startingArmies > 1){

					newRound = false;
					game.startingArmies = game.startingArmies - 1;

				}

				if(newRound == true){

					game.round = game.round + 1;

				}

				//console.log(playerIDs);

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
		});
	},

	createGame: function (req, res) {

		var gameName = req.body.gameName;
		var password = req.body.password;
		var numPlayers = req.body.numPlayers;
		var playerID = req.session.user;

		if (typeof playerID === 'undefined') {
			res.send('User Is Not Logged In!');
		}

		console.log(gameName+' '+password+' '+numPlayers+' '+playerID);

		Games.create({
			name: gameName,
			password: password,
			numPlayers: numPlayers,
			players: playerID,
			currentUserTurn: playerID
		}).exec(function(err, game) {
			if (err) {
				res.send('Database Error: Couldnt Create Game');
			}
			Games.publishCreate({id: game.id, name: game.name, password: game.password, numPlayers: game.numPlayers, currentPlayers: 1});
			res.send({create: true, id: game.id});
		});
	},

	sendChatMessage: function (req, res) {
		var gameID = req.body.gameID;
		var playerID = req.session.user;
		var playerName = req.session.name;
		var message = req.body.message;
		var chatMessage = playerName+' - '+message;

		Games.findOne(gameID).exec(function(err, game){
			if (err) {
				res.send('Game Not Found');
			}

			Games.message(gameID, {message: chatMessage, update: 'chat', status: 'message'});
			res.send('Message Sent');
		});
	}
};
