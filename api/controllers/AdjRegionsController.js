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
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 1,
			adjRegion: 6
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 1,
			adjRegion: 32
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 6,
			adjRegion: 1
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 6,
			adjRegion: 2
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 6,
			adjRegion: 7
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 6,
			adjRegion: 5
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 2,
			adjRegion: 1
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 2,
			adjRegion: 6
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 2,
			adjRegion: 7
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 2,
			adjRegion: 9
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 5,
			adjRegion: 6
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 5,
			adjRegion: 7
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 5,
			adjRegion: 8
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 5,
			adjRegion: 15
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 7,
			adjRegion: 6
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 7,
			adjRegion: 2
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 7,
			adjRegion: 8
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 7,
			adjRegion: 5
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 7,
			adjRegion: 4
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 7,
			adjRegion: 2
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 9,
			adjRegion: 2
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 9,
			adjRegion: 7
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 9,
			adjRegion: 4
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 9,
			adjRegion: 3
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 4,
			adjRegion: 7
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 4,
			adjRegion: 8
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 4,
			adjRegion: 9
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
		AdjRegions.create({
			region: 4,
			adjRegion: 3
		}).exec(function(err, adjRegion) {
			//console.log(adjRegion);
		});
	},

	canAttack: function(req, res) {
		//Will take two region IDs and see if they can attack each other
		var values = req.allParams();
		var t1 = values.t1;
		var t2 = values.t2;

		AdjRegions.find({
			region: t1,
			adjRegion: t2
		}).exec(function findCB(err, found) {
			//console.log(found);
		});
	}
};

