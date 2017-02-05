'use strict';

var mongoose = require('mongoose');
var Post = mongoose.model('Post');

exports.create = create;
exports.remove = remove;
exports.list = list;
exports.postByTitle = postByTitle;
exports.read = read;
exports.update = update;

// Try to create and save a post with the req.body. If there is an error, it is returned in the response
function create(req, res) {
    var post = new Post(req.body);
    post.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        else {
            res.json(post);
        }
    });
}

// Gets all posts. If there is an error, it is returned in the response
function list(req, res) {
    Post.find().sort('date').exec(function (err, posts) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        else {
            res.json(posts);
        }
    });
}

// Gets a post by title. If there is an error, it is returned in the response
function postByTitle(req, res, next, title) {
    Post.findOne({
        title: title
    }).exec(function (err, post) {
        if (err) {
            return next(err);
        }
        if (!post) {
            return next(new Error('Failed to load post ' + title));
        }
        req.post = post;
        next();
    });
}

function read(req, res) {
    res.json(req.post);
}

// Removes a post from the database. If an error occurs, it is passed back through the response.
function remove(req, res) {
    var post = req.post;

    post.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        else {
            res.json(post);
        }
    });
}

// Tries to update a post. If there is an error, it is returned in the response. Assumes that req.post is a post that has been retrieved by middleware.
function update(req, res) {
    var post = req.post;
    var updates = req.body;

    for (var prop in updates) {
        post[prop] = updates[prop];
    }

    post.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        else {
            res.json(post);
        }
    });
}

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
