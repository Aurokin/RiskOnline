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

		console.log(req.body);
		//call startGame
		//then call addtroops
		//then call changeTurn



	},

	addTroops : function (req , res){

		console.log(req.playerName);
		console.log(req.TerritoryName);
		return;



		req.body;
	/*	post(user, region_id, troops)
		session(game_id)
		*/

		var user = req.body.username;
		var regionID = req.body.regionID;

		Game.get({id: gameId}, function(game){

			if (regionID.controlledBy == username){

					regionID.armyCount++;

			}

		});

		Games.publishUpdate(game.id, game);
		return res.json(game);
	},

	attack : function (req, res){

		var user = req.body.username;
		var regionID = req.body.regionID;

		//region occupied
		//who is attacking, being attacked?
		//make sure it isn't owned by the same person
		//check if region is adjacent
		//Math?
		//change color of one country
		//update database with publishUpdate

	},

	move : function (req, res) {

		var playerID = req.body.playerID;

		//person, country1, country2, number of troops
		/*
		req.url gets everything past the /
		Maybe use req.param


		if(game.regions[to].armyCount ==0 && game.regions[from].armyCount>2 ){
		game.regions[to]+=number;
		game.regions[to].controlledBy=player;
		game.regions[from]-=number;
	}*/


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

		var gameID = req.body.gameID;
		var playerID = req.body.playerID;

		Games.findOne(gameID).exec(function(err, gameID){

			if(game.player.playerID == game.player.currentUserTurn){
				if( /*end turn button selected*/){
					game.save(function(err){
						console.log("inside change turn");
							Games.findOne(gameID).exec(function(err, game){
								if (err){

								}
								if(game.numPlayers == game.currentUserTurn){
									/*var currentRound = game.round+1;
									Games.publishUpdate(game.id,{
										round: currentRound,
										currentUserTurn: 1, //what if player 1 loses?*/
										increaseRound(gameID, /*what to add?*/)

								});
								else{

									Games.publishUpdate(game.id,{
										currentUserTurn: array[], //number that comes next
								});

							});
						});
					});
				};
			};

				//if yes then move turn back to player one
				//update gamestate
		});
	},

	increaseRound: function (req, res) {

		//if changeTurn has been activated
		//update round information
		//Games.publishUpdate(gameID, currentUserTurn, round)


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
};
