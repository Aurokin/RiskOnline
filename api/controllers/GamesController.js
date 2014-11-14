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


		Games.findOne({ id: gameID}).populate('regions').then(function(game){
			var players = GamesUsersLink.find({
				gameID: game.id
			}).then(function(players) {
				return players;
			});

			/*
			http://stackoverflow.com/questions/23446484/sails-js-populate-nested-associations
			var regions = Region.find({id: _.pluck(game.regions, 'region')
			}).then(function(regions) {
				return regions;
			});
			return [game, players, regions];
			*/
			
			return [game, players];
		}).spread(function (game, players, regions) {
			/*
			var regions = _.indexBy(regions, 'id');
			game.regions = _.map(game.region, function(region) {
				region.region = regions[region.region];
			});*/
			return res.json({
				game: game,
				players: players
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

	}
};

