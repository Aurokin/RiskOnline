/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	login: function (req, res) {

		var bcrypt = require('bcrypt');

		Users.findOne({
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
						req.session.user = user.id;
						res.view('static/index');;
					}
				});
			}
		});
	}

};

