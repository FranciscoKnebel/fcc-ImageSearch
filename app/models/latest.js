var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var latest = Schema({
    query: String,
    date: Date
});

module.exports = mongoose.model('latest', latest);