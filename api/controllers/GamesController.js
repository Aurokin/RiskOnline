/**
 * GamesController
 *
 * @description :: Server-side logic for managing Games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	gameState: function (req, res) {
		//Will Report Game, Players, Regions
		console.log(req);
		console.log(req.query);
		console.log(req.query.id);
		return res.json({
			gameState: 'Will Be Here'
		});
	},

	changeTurn: function (req, res) {

	},

	increaseRound: function (req, res) {

	},

	endGame: function (req, res) {

	}
};

