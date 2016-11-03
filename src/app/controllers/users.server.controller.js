module.exports.render = function(req, res) {
	//res.render uses the setting given with "app.set(view engine, ___)" which was set in config/express.js
	res.render('users', {
		title: "Users",
		users: 'Add list of users as string here for debugging purposes.'
	});
};