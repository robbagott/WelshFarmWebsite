"use strict";

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.render = function(req, res, next) {
	User.find({}, function(err, users) {
		if (err) {
			return next(err);
		}
		else {
			//res.render uses the setting given with "app.set(<view engine>, <engine name>)" and app.set('views', <views directors>); which was set in config/express.js
			res.render('users', {
				title: "Users",
				users: JSON.stringify(users, {}, '\t')
			});
		}
	});
};

module.exports.createUser = function(req, res, next) {
	var user = new User(req.body);

	//save() is built into all Mongoose Document objects
	user.save(function(err) {
		if (err) {
			return next(err);
		}
		else {
			res.json(user);
		}
	});
};