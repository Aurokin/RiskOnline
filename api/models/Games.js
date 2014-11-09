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
