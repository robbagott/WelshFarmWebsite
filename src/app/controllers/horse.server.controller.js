'use strict';

var mongoose = require('mongoose');
var Horse = mongoose.model('Horse');

exports.create = create;
exports.remove = remove;
exports.horseByName = horseByName;
exports.list = list;
exports.read = read;
exports.update = update;

// Try to create and save a horse with the req.body. If there is an error, it is returned in the response
function create(req, res) {
    var horse = new Horse(req.body);
    horse.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        else {
            res.json(horse);
        }
    });
};

// Gets the full list of horses. If there is an error, it is returned in the response
function list(req, res) {
    Horse.find().sort('showName').exec(function (err, horses) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        else {
            res.json(horses);
        }
    });
};

// Gets a horse by name. If there is an error, it is returned in the response
function horseByName(req, res, next, name) {
    Horse.findOne({
        showName: name
    }).exec(function (err, horse) {
        if (err) {
            return next(err);
        }
        if (!horse) {
            return next(new Error('Failed to load horse ' + name));
        }
        req.horse = horse;
        next();
    });
};

function read(req, res) {
    res.json(req.horse);
};

// Removes a horse from the database.
function remove(req, res) {
    var horse = req.horse;

    horse.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        else {
            res.json(horse);
        }
    });
};

// Tries to update a horse. If there is an error, it is returned in the response. Assumes that req.horse is a horse that has been retrieved by middleware.
function update(req, res) {
    var horse = req.horse;
    var updates = req.body;

    for (var prop in updates) {
        horse[prop] = updates[prop];
    }

    horse.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        else {
            res.json(horse);
        }
    });
};

/*
 * Helper functions
 */

// Convenience function for extracting error messages
function getErrorMessage(err) {
    console.log(err);
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                return err.errors[errName].message;
            }
        }
    }
    else {
        return 'Unknown server error';
    }
};
