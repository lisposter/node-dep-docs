'use strict';
var path = require('path');
var fs = require('fs');

var resolveDep = require('resolve-dep');

module.exports = exports.depDocs = depDocs;

function depDocs(_path, options) {
    if(_path.indexOf('node_modules') < 0) {
        _path = path.resolve(_path, 'node_modules/');
    }

    return resolveDep(_path + '/*', options).map(function(dep) {
        return path.resolve(dep, fs.readdirSync(dep).filter(function(file){
            return /^readme/.test(file.toLowerCase());
        })[0] || 'NONE');
    });
}
