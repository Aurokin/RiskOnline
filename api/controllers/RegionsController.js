/**
 * RegionsController
 *
 * @description :: Server-side logic for managing Regions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	fillWithRegions: function (req, res) {
		Regions.create({
			regionID: 1,
			name: 'hello',
			continent: 'yes'
		}).exec(function(err, region) {
			console.log(region);
		});
	}

};

