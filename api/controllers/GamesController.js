/**
 * GamesController
 *
 * @description :: Server-side logic for managing Games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

/*Summer had some stuff here but wasn't relevent */

module.exports = {
	gameState: function (req, res) {
		//Will Report Game, Players, Regions
		//Requires GET with gameID
		var gameID = req.query.gameID;


		Games.findOne({ id: gameID}).populate('regions').populate('players').then(function(game){

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

	changeTurn: function (req, res) {

	},

	increaseRound: function (req, res) {

	},

	endGame: function (req, res) {

	},

	addPlayer: function (req, res) {
		//Will Add Player To Game
		//Requires POST with gameID / playerID
		//console.log(req);
		var gameID = req.body.gameID;
		var playerID = req.body.playerID;
		//console.log('gameID = '+gameID);
		//console.log('playerID = '+playerID);
		Games.findOne(gameID).exec(function(err, game) {
			//console.log(game);
			if (err) {
				//Error Goes Here
				//console.log('first stop');
			}
			game.players.add(playerID);
			//console.log(game);
			game.save(function(err) {
				//console.log('second stop');
				//console.log(err);
				//Error goes Here
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
		//console.log('gameID = '+gameID);
		//console.log('playerID = '+playerID);
		Games.findOne(gameID).exec(function(err, game) {
			//console.log(game);
			if (err) {
				//Error Goes Here
				//console.log('first stop');
			}
			game.players.remove(playerID);
			//console.log(game);
			game.save(function(err) {
				//console.log('second stop');
				//console.log(err);
				//Error goes Here
			});
			return res.json({
				game: game
			});
		});
	}
};
