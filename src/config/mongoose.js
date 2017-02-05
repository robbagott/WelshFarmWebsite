'use strict';

var config = require('./config');
var mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);

    db.connection.on('error', console.error.bind(console, 'connection error:'));

    // Configure the db. It doesn't need the db as a parameter. Instead it modifies mongoose by requiring it a second time which returns a singleton.
    require('../app/models/user.server.model.js');
    require('../app/models/horse.server.model.js');
    require('../app/models/post.server.model.js');

    return db;
};
