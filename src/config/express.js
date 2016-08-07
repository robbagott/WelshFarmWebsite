'use strict';

var config = require('./config'); //Sets configuration variables based on process.env.NODE_ENV
var express = require('express');
var compression = require('compression');
var morgan = require('morgan');
var bodyParser = require('body-parser');			
var methodOverride = require('method-override');	

module.exports = function() {
	var app = express();

	if (process.env.NODE_ENV === 'production') {
		//Compression should be used in production. Compresses the 
		app.use(compression());
	}

	//Logging
	app.use(morgan(config.morganSetting));

	/*Some forms send x-form-urlencoded formatted bodies in their post requests.
	**body-parser attempts to parse the body as such and gives up if it cannot */
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	//Parse the request body html into a json object. Added to req object as req.body
	app.use(bodyParser.json());

	/* Allows for the use of PUT and DELETE http methods. 
	** These are passed through the _method post parameter 
	** This changes the detected http method to PUT or DELETE*/
	app.use(methodOverride());

	//Add our routes which in turn require our controllers where needed, thus glueing the project together
	require('../app/routes/index.server.routes.js')(app);

	//If a request can't be handled by other middleware then try a static file
	app.use(express.static('../public/'));

	return app;
}
