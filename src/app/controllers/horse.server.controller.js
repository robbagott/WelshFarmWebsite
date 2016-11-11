"use strict";

var mongoose = require('mongoose');
var Horse = mongoose.model('Horse');

// Convenience function for extracting error messages
var getErrorMessage = function (err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) {
				return err.errors[errName].message;
			}
			else {
				return 'Unknown server error';
			}
		}
	}
};

// Try to create and save a horse with the req.body. If there is an error, it is returned in the response
exports.create = function (req, res) {
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
exports.list = function (req, res) {
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
exports.horseByName = function (req, res, next, name) {
	Horse.findById(name).exec(function (err, horse) {
		if (err) {
			return next(err);
		}
		if (!horse) {
			return next(new Error('Failed to load article ' + name));
		}
		req.horse = horse;
		next();
	});
};

exports.read = function (req, res) {
	res.json(req.horse);
};

// Tries to update a horse. If there is an error, it is returned in the response. Assumes that req.horse is a horse that has been retrieved by middleware.
exports.update = function (req, res) {
	var horse = req.horse;

	horse.name = req.body.name;
	horse.showName = req.body.showName;
	horse.description = req.body.description;

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

exports.delete = function (req, res) {
	var horse = req.horse;

	horse.remove(function (err) {
		if (err) {
			return res.status(400).send({
				message: getErroeMessage(err)
			});
		}
		else {
			res.json(horse);
		}
	});
};