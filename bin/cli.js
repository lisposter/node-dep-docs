#! /usr/bin/env node
'use strict';
var fs = require('fs');
var path = require('path');

var map = require('through2-map');
var marked = require('marked');
var mkdirp = require('mkdirp');
var depDocs = require('..');

var docList = depDocs(path.resolve(process.cwd(), process.argv[2]));
var docDir = process.cwd() + '/node_modules/_docs';

mkdirp.sync(docDir);

docList.forEach(function(doc) {
    var _docPath = doc.split('/');
    var moduleName = _docPath[_docPath.length - 2];

    if(_docPath.pop() !== 'NONE') {
        fs.createReadStream(doc).pipe(map({wantStrings: true}, function(str) {
            return marked(str);
        })).pipe(fs.createWriteStream(docDir + '/' + moduleName + '.html'));
    }
});
