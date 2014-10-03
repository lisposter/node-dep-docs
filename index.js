'use strict';
var path = require('path');
var fs = require('fs');

var resolveDep = require('resolve-dep');

module.exports = exports.depDocs = depDocs;

function depDocs(_path, options) {
    if(_path.indexOf('node_modules') < 0) {
        _path = path.resolve(_path, 'node_modules/');
    }

    var docs = [];
    var nodocs = [];

    resolveDep(_path + '/*', options).forEach(function(dep) {
        var doc = fs.readdirSync(dep).filter(function(file){
            return /^readme/.test(file.toLowerCase());
        })[0];

        if(doc) {
            docs.push(path.resolve(dep, doc));
        } else {
            nodocs.push(dep);
        }
    });

    return [docs, nodocs];
}
