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
			return res.json({
				game: game
			})
		}).catch(function (err){
			console.log(err);
			return res.json({
				gameState: 'WIP'
			});
		});
	},

	initMap : function (req, res) {

	},

	addTroops : function (req , res){

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
	},

	changeTurn: function (req, res) {

	},

	increaseRound: function (req, res) {

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

					Games.publishUpdate(game.id, game);

					return res.json(game);
				});
				//Error goes Here
			});

			Games.publishUpdate(game.id, {
				id: game.id
			});

			return res.json({
				game: game
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

					Games.publishUpdate(game.id, game);

					return res.json(game);
				});
			});
		});
	},
	gameList: function (req, res) {

	},

	joinGame: function (req, res) {
		//Requires GameID, PlayerID, Password
		var gameID = req.body.gameID;
		var playerID = req.body.playerID;
		var password = req.body.password;
		var roomName = req.param('game'+gameID+'info');

		console.log('gameID: '+gameID);
		console.log('playerID: '+playerID);
		console.log('password: '+password);
		console.log(typeof playerID);

		if (typeof playerID === 'object' || typeof gameID === 'object') {
			return res.send('Invalid Player Or GameID');
		}

		Games.findOne(gameID).exec(function(err, game) {

			if (err) {

			}

			console.log(password);
			console.log(game.password);

			if (game.password == password || game.password == null) {
				if (game.players.length < game.numPlayers) {

					//Should only add if it does not already exist
					game.players.add(playerID);
					game.save(function(err) {
						Games.publishUpdate(game.id, {player: 1});
						sails.sockets.join(req.socket, roomName);
						//Should Emit Player Name Later
						sails.sockets.emit(roomName, 'playerJoined', {
							playerID: playerID
						});
					return res.redirect('/game/lobby');
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
	}

};
