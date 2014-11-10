/**
 * AdjRegionsController
 *
 * @description :: Server-side logic for managing adjregions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	fillWithAdjRegions: function (req, res) {
		AdjRegions.create({
			region: 1,
			adjRegion: 2
		}).exec(function(err, adjRegion) {
			console.log(adjRegion);
		});
	}
};

