var model = require('./models/****');

module.exports = function(app, db, dirname) {
    db.on  ('error', console.error.bind(console, 'connection error:'));
    
    db.once('open' , function() {
		
	});

};