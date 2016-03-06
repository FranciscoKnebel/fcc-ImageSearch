var express = require("express");

module.exports = function(app, dirname) {
    
    app.route('/')
        .get(function(req, res) {
            res.sendFile(dirname + '/client/views/index.html');
        });
        
    app.route('/LICENSE/')
        .get(function(req, res) {
            res.sendFile(dirname + '/LICENSE.md');
        });
    
};