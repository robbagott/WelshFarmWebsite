"use strict";

var mongoose = require('mongoose');

//Schema is a constructor, hence capitalization. A Schema defines the structure of stored data in a specific collection
var Schema = mongoose.Schema;

var horseSchema = new Schema({
	name: {
		type: String,
		trim: true,
		unique: true,
		required: 'Username is required'
	},
	showName: {
		type: String,
		trim: true,
		unique: true,
		required: 'Username is required'
	},
	description: {
		type: String
	},
	images: [String]
});

//Now, create a Model using the schema. A Model allows us to create Documents (Instances of the Model) and define methods (instance and static) for retrieving, saving, and manipulating Documents
//A Document of Model User can now be created with new mongoose.model('User')
var Horse = mongoose.model('Horse', horseSchema);