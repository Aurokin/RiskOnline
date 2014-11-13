/**
 * GamesController
 *
 * @description :: Server-side logic for managing Games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

exports.initGame = function(sio, socket){
	var io = sio;
	gameSocket = socket;
	gameSocket.emit('connect', {message: "You are connected!"});

	gameSocket.on('gameState', gameState);

}


module.exports = {
	gameState: function (req, res) {
		//Will Report Game, Players, Regions
		//Requires GET with gameID
		var gameID = req.query.gameID;


		Games.findOne({ id: gameID}).then(function(game){
			var players = GamesUsersLink.find({
				gameID: game.id
			}).then(function(players) {
				return players;
			});
			return [game, players];
		}).spread(function (game, players) {
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
