var express = require("express");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var routes = require("./app/routes/index.js");
var api = require("./app/api.js");

var port = process.env.PORT || 8080;
mongoose.connect(process.env.MLAB_URL);

var db = mongoose.connection;
var app = express();


app.use('/css', express.static(__dirname + '/client/css'));

routes(app, __dirname);
api(app, db, __dirname);

app.listen(port,  function () {
	console.log('Listening on port ' + port + '...');
});
