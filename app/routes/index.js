var express = require("express");

module.exports = function(app, dirname) {
    
    app.get('/', function(req, res) {
            res.sendFile(dirname + '/client/views/index.html');
        });
        
    app.get('/LICENSE/', function(req, res) {
            res.sendFile(dirname + '/LICENSE.md');
        });
    
    //404
    app.get('/*', function(req, res) {
            res.sendFile(dirname + '/client/views/404.html');
        })
    
};