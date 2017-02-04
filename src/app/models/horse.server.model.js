'use strict';

var mongoose = require('mongoose');

// Schema is a constructor, hence capitalization. A Schema defines the structure of stored data in a specific collection
var Schema = mongoose.Schema;

var horseSchema = new Schema({
    birthDate: {
        type: Date,
        required: 'Birth date is a required field'
    },
    color: {
        type: String,
        required: 'Coloration is a required field.'
    },
    dam: {
        type: Object
    },
    description: {
        type: String
    },
    farmName: {
        type: String,
        trim: true,
        unique: true
    },
    gelded: {
        type: Boolean,
        required: 'Gelded is a required field.'
    },
    grey: {
        type: Boolean,
        required: 'Grey is a required field.'
    },
    height: {
        type: Number,
        required: 'Height is a required field.'
    },
    images: [String],
    sex: {
        type: String,
        validate: {
            validator: function(sex) {
                //Check for male or female
                return sex == 'male' || sex == 'female';
            },
            msg: 'Sex must be either "male" or "female"'
        },
        require: 'Sex is a required field'
    },
    showName: {
        type: String,
        trim: true,
        unique: true,
        required: 'Show name is a required field'
    },
    sire: {
        type: Object
    }
});

// Now, create a Model using the schema. A Model allows us to create Documents (Instances of the Model) and define methods (instance and static) for retrieving, saving, and manipulating Documents
// A Document of Model User can now be created with new mongoose.model('User')
var Horse = mongoose.model('Horse', horseSchema);
