var express = require("express");
var mongoose = require("mongoose");
var routes = require("./app/routes/index.js");
var api = require("./app/api.js");

var port = process.env.PORT || 8080;
mongoose.connect(process.env.MONGOLAB_URL);
var db = mongoose.connection;
var app = express();

routes(app, __dirname);
api(app, db, __dirname);

app.use('/css', express.static(__dirname + '/client/css'));

app.listen(port,  function () {
	console.log('Listening on port ' + port + '...');
});
