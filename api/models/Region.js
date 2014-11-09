/* Create table Region that is controlled by player 
 * and keep number of Troops
 */

module.exports = {
	attributes:{
		RegionID:{
			type:'string',
			require:true,
			unique:true
		},
		ArmyCount:{
			type:'Integer'
		},
		ControlledBy:{
			type:'string',
		}
	}
};
