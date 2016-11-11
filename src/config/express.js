'use strict';

var config = require('./config'); //Sets configuration variables based on process.env.NODE_ENV
var express = require('express');
var compression = require('compression');
var morgan = require('morgan');
var bodyParser = require('body-parser');			
var methodOverride = require('method-override');	
var session = require('express-session');

module.exports = function() {
	var app = express();

	if (process.env.NODE_ENV === 'production') {
		//Compression should be used in production. Compresses the 
		app.use(compression());
	}

	//Logging
	app.use(morgan(config.morganSetting));

	/* Some forms send x-form-urlencoded formatted bodies in their post requests.
	** body-parser attempts to parse the body as such and gives up if it cannot */
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	//Parse the request body html into a json object. Added to req object as req.body
	app.use(bodyParser.json());

	/* Allows for the use of PUT and DELETE http methods. 
	** These are passed through the _method post parameter 
	** This changes the detected http method to PUT or DELETE*/
	app.use(methodOverride());

	/* Session adds a req.session object to every request object which contains session variables */
	//MUST CHANGE STORES AT SOME POINT BEFORE PRODUCTION STAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	//^That should be enough to make you remember! 
	app.use(session({
		saveUninitialized: false,		//This setting decides whether a session that's been created but not modified should be saved
		resave: false,					//This setting decides whether to resave when there were no modifications to the session object
		secret: config.sessionSecret
	}));
 
	//Sets a folder to search for views and sets a view engine to be called with res.render()
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	//If a request can't be handled by other middleware then try a static file
	app.use(express.static('./public/'));

	//Add our routes which in turn require our controllers where needed, thus glueing the project together
	require('../app/routes/admin.server.routes.js')(app);
	require('../app/routes/horses.server.routes.js')(app);
	
	//Lastly, if nothing has been done so far, we probably want our angular app to handle the route. Load the main app and have it's routing deal with it.
	app.get('*', function(req, res) {
		res.render("index");
	});

	return app;
};