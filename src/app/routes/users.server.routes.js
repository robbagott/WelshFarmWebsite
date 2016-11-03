module.exports = function(app) {
	var users = require('../controllers/users.server.controller');
	app.route('/users').get(users.render);
};