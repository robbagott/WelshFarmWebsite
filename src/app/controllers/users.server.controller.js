"use strict";

module.exports.render = function(req, res) {
	res.render("users", {
		title: "Edit Users"
	});
};