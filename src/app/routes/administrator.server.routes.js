"use strict";

module.exports = function(app) {
	var adminController = require("../controllers/administrator.server.controller.js");

	app.route("/administrator").get(adminController.render);
};