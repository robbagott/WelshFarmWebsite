"use strict";

var mongoose = require('mongoose');

//Schema is a constructor, hence capitalization. A Schema defines the structure of stored data in a specific collection
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: 'Username is required'
    },
    password: {
        type: String,
        validate: [
            {
                validator: function(password) {
                    //Check for presence of whitespace
                    return password && (password.indexOf(' ') < 0);
                },
                msg: 'Password contains whitespace'
            },
            {
                validator: function(password) {
                    //Check for password length
                    return password && password.length > 6;
                },
                msg: 'Password is too short'
            }
        ]
    }
});

//Now, create a Model using the schema. A Model allows us to create Documents (Instances of the Model) and define methods (instance and static) for retrieving, saving, and manipulating Documents
//A Document of Model User can now be created with new mongoose.model('User')
var User = mongoose.model('User', userSchema);
