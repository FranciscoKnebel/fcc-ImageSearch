var dotenv = require("dotenv");
var request = require("request");

module.exports = function(app, dirname) {

    app.get('/', function(req, res) {
        res.sendFile(dirname + '/client/views/index.html');
    });

    app.get('/LICENSE/', function(req, res) {
        res.sendFile(dirname + '/LICENSE.md');
    });

    app.get('/search', function(req, res) {
        res.sendFile(dirname + '/client/views/index.html');
    });

};