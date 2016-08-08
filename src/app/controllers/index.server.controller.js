module.exports.render = function(req, res) {
	//res.render uses the setting given with "app.set(view engine, ___)" which was set in config/express.js
	res.render('index', {
		title: 'Hello World'
	});
};