"use strict";

module.exports = function(app) {
	var adminController = require("../controllers/administrator.server.controller.js");
	var usersController = require("../controllers/users.server.controller.js");
	var horsesController = require("../controllers/horses.server.controller.js");

	app.route("/administrator/users").get(usersController.render);
	app.route("/administrator/horses").get(horsesController.render);
	app.route("/administrator").get(adminController.render);
};