'use strict';

var fs = require('fs');
var mkdirp = require('mkdirp')

function ensureDirExists(path, mask, cb) {
    if (typeof mask == 'function') {
        cb = mask;
        mask = '0777';
    }
    mkdirp(path, {}, function(err) {
        if (err) {
            if (err.code == 'EEXIST') {
                // Ignore the error if the dir already exists.
                cb(null);
            } else {
                // Don't ignore other errors.
                cb(err);
            }
        } else {
            cb(null)
        }
    });
}

exports.create = function (req, res, next) {
    var imageFiles = req.body.imageFiles;

    if (!imageFiles) {
        console.log('No image files in req.body.imageFiles to create');
        return;
    }

    // If a showName was passed with the request, save it to the folder with that name.
    var filePath = process.cwd() + '/public/images/';
    if (req.body.showName) {
        filePath += req.body.showName + '/';
    }
    else {
        filePath += 'miscellaneous/';
    }

    ensureDirExists(filePath, '0777', function (err) {
        for (var i = 0; i < imageFiles.length; i++) {
            console.log('writing file: ' + imageFiles[i].fileName);
            var data = imageFiles[i].dataURL;
            data = data.substr(data.indexOf(',') + 1);
            fs.writeFile(filePath + imageFiles[i].fileName, data, 'base64', function (err) {
                if (err) {
                    console.log(err);
                };
            });
        }
    });

    next();
};
