var dotenv = require("dotenv");
var request = require("request");

module.exports = function(app, dirname) {

    app.get('/', function(req, res) {
        res.sendFile(dirname + '/client/views/index.html');
    });

    app.get('/LICENSE/', function(req, res) {
        res.sendFile(dirname + '/LICENSE.md');
    });

    app.get('/latest', function(req, res) {
        //Get latest query terms from DB.
        res.send("Latest.");
    })

    app.get('/search', function(req, res) {
        res.sendFile(dirname + '/client/views/index.html');
    });

};