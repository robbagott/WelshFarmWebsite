"use strict";

module.exports = function(app) {
    var adminController = require("../controllers/admin.server.controller.js");
    app.route("/admin*").get(adminController.render);
};
