/**
* Region.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
	attributes:{
		ArmyCount:{
			type:'integer',
			defaultsTo:0
		},
		ControlledBy:{
			type:'integer',
			defaultsTo:0
		}
	}
};
