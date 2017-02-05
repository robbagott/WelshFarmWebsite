'use strict';

var posts = require('../controllers/post.server.controller');

module.exports = function(app) {
    app.route('/api/posts')
        .get(posts.list)
        .post(posts.create);

    app.route('/api/posts/:postTitle')
        .get(posts.read)
        .put(posts.update)
        .delete(posts.remove);

    app.param('postTitle', posts.postByTitle);
};
