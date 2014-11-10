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
  		type: 'integer'
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
  	},

    password: {
      type: 'string'
    },

    tempGameID: {
      type: 'string'
    },

    regions: {
      collection: 'region',
      via: 'game'
    }
  },

  beforeCreate: function (values, cb) {
    values.startDate = new Date().toISOString();
    var players = values.players.split(',').map(Number);
    console.log(values);
    console.log(players);
    cb();
  },

  afterCreate: function (values, cb) {
    console.log(values);
    cb();
  }
};
