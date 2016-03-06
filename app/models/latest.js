var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var latest = Schema({
    term: String,
    when: Date
});

module.exports = mongoose.model('LATEST', latest);