#! /usr/bin/env node
'use strict';
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var async = require('async');
var map = require('through2-map');
var marked = require('marked');
var mkdirp = require('mkdirp');
var depDocs = require('..');

var docList = depDocs(path.resolve(process.cwd(), process.argv[2]));
var docDir = process.cwd() + '/node_modules/.docs';

mkdirp.sync(docDir);

fs.writeFileSync(docDir + '/markdown.css', fs.readFileSync(path.resolve(__dirname, '../assets/markdown.css')));

async.each(docList[0], function(doc, callback){
    var _docPath = doc.split('/');
    var moduleName = _docPath[_docPath.length - 2];

    fs.createReadStream(doc).pipe(map({wantStrings: true}, function(str) {
        var _prepend =  '<!DOCTYPE html>' +
                        '<html>' +
                        '<head>' +
                        '<title>' + moduleName + '</title>' +
                        '<link rel="stylesheet" href="markdown.css">' +
                        '</head>' +
                        '<body class="markdown-body">';
        var _append =   '</body>' +
                        '</html>';
        return _prepend + marked(str) + _append;
    })).pipe(fs.createWriteStream(docDir + '/' + moduleName + '.html'));
    callback();
}, function(err) {
    if(err) {
        throw err;
    }

    // TODO: more beautiful
    var _prepend =  '<!DOCTYPE html>' +
                    '<html>' +
                    '<head>' +
                    '<title>Docs List</title>' +
                    '<link rel="stylesheet" href="markdown.css">' +
                    '</head>' +
                    '<body class="markdown-body">' +
                    '<ul>';
    var _append =   '</ul>' +
                    '</body>' +
                    '</html>';
    var htmlStr = docList[0].reduce(function(memo, doc){
        var _docPath = doc.split('/');
        var moduleName = _docPath[_docPath.length - 2];

        return  memo + '<li><a href="' +
                        docDir + '/' + moduleName + '.html' +
                        '">' +
                        moduleName +
                        '</a></li>';
    }, _prepend) + docList[1].reduce(function(memo, doc){
        var _docPath = doc.split('/');
        var moduleName = _docPath[_docPath.length - 1];
        return memo + '<li>' + moduleName + '</li>';
    }, '') + _append;

    fs.writeFileSync(docDir + '/_toc.html', htmlStr);
});

exec('open ' + docDir + '/_toc.html');
