/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	login: function (req, res) {

		var bcrypt = require('bcrypt');

		User.findOne({
			email: req.body.email
		}, function(err, user) {
			if (err) {
				res.json({ error: 'DB error' }, 500);
			}

			if (!user) {
				res.view('static/index');
			}
			else {
				bcrypt.compare(req.body.password, user.password, function(err, match) {
					if (match) {
						//console.log('login');
						req.session.name = user.name;
						req.session.user = user.id;
						res.view('static/index');
					}
				});
			}
		});
	},

	logout: function (req, res) {
		req.session.destroy();
		res.view('static/index');
	}

};

