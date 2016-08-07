'use strict';

/* Default the NODE_ENV variable to 'development' if it is not set
** Note the || operator in js checks the true/false value of the first
** operand and if it is falsy, will return the second operand */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
//var mongoose = require('.config/mongoose');

//var db = mongoose();
var app = express();

//express is a node.js server wrapper so we call listen on it.
app.listen(3000);

module.exports = app;

console.log('Welsh Pony Farm Website is listening on http://localhost:3000');