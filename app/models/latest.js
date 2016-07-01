var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var latest = Schema({
    query: String,
    date: String
});

module.exports = mongoose.model('latest', latest);