"use strict";

module.exports = function(app) {
	var usersController = require('../controllers/users.server.controller');

	app.route('/users').get(usersController.render)
		.post(usersController.createUser);
};