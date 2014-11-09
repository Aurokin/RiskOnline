<<<<<<< HEAD
/**
* Games.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	numPlayers: {
  		type: 'integer'
  	},

  	round: {
  		type: 'integer',
  		autoIncrement: true
  	},

  	currentUserTurn: {
  		type: 'integer'
  	},

  	startDate: {
  		type: 'datetime'
  	},

  	endDate: {
  		type: 'datetime'
  	},

  	winner: {
  		type: 'integer'
  	}
  }
};

=======
/*
 * Create table for games that hold gameID, numPlayer,
 * Round, CurrentUser, startDate, EndDate, Winner
 */

module.exports = {
	tableName:'Games',
	attributes:{
		gameID:'string',
		numPlayer:'Integer',
		round: 'Integer',
		rurrentUser: 'string',
		startDate: 'date',
		endDate: 'date',
		winner:'string'
	}
};
>>>>>>> 69077873b2ac64ae15d97d82d868c38577825d24
