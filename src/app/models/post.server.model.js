'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    date: {
        type: Date,
        required: 'Date is a required field'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'Author is a required field'
    },
    title: {
        type: String,
        required: 'Title is a required field'
    },
    text: {
        type: String
    },
    image: {
        type: String
    }
});

// Now, create a Model using the schema. A Model allows us to create Documents (Instances of the Model) and define methods (instance and static) for retrieving, saving, and manipulating Documents
// A Document of Model User can now be created with new mongoose.model('User')
var Post = mongoose.model('Blog', postSchema);
