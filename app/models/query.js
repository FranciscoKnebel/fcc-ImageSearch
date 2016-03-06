var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var query = Schema({
    url: String,
    snippet: String,
    thumbnail: String,
    context: String
});

module.exports = mongoose.model('QUERY', query);