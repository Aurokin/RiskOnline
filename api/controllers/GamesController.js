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


	changeTurn: function (req, res) {

	},

	increaseRound: function (req, res) {

	},

	endGame: function (req, res) {

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
	}
};
