"use strict";

module.exports.render = function(req, res) {
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}
	req.session.lastVisit = new Date();
		
	//res.render uses the setting given with "app.set(view engine, ___)" which was set in config/express.js
	res.render('index', {
		title: 'Faylin Welsh'
	});
};