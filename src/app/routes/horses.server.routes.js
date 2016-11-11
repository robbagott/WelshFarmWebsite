"use strict";

var horses = require('../controllers/horse.server.controller');

module.exports = function(app) {
	// Check the MEAN book page 205 for auth ideas
	app.route('/api/horses')
		.get(horses.list)
		.post(horses.create);

	app.route('/api/horses/:horseName')
		.get(horses.read)
		.post(horses.delete);

	app.param('horseName', horses.horseByName);
};