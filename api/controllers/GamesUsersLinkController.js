/**
 * GamesUsersLinkController
 *
 * @description :: Server-side logic for managing gamesuserslinks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	PlayersBasedOnGame: function(req, res) {
		//Temp Value
		var gameID = 1;
		//
		GamesUsersLink.find({
			gameID: gameID
		}).exec(function findCB(err, found) {
			console.log(found);
		});
	}
};

