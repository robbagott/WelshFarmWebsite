"use strict";

module.exports.render = function(req, res) {
	res.render("horses", {
		title: "Edit Horses"
	});
};