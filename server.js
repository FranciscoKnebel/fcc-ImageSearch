var express = require("express");
var mongoose = require("mongoose");
var dotenv = require("dotenv").load();
/*    file .env must contain:
      MLAB_URL
      BING_API
*/
var routes = require("./app/routes/index");
var api = require("./app/api");

var port = process.env.PORT || 80;
mongoose.connect(process.env.MLAB_URL);
var db = mongoose.connection;

var app = express();

app.use('/css', express.static(__dirname + '/client/css'));

routes(app, __dirname);
api(app, db, __dirname);

//404
app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/client/views/404.html');
});

app.listen(port,  function () {
	console.log('Listening on port ' + port + '...');
});
