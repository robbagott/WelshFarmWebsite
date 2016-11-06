"use strict";

module.exports.render = function(req, res) {
	res.render("administrator", {
		title: "Admin Login"
	});
};