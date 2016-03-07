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
    
    app.get('/search/:query', function(req, res) {
        var url = 'https://www.googleapis.com/customsearch/v1?key=' + process.env.GOOGLE_API + '&cx=' + process.env.CSE_ID;
        var query = '&q=' + req.params.query;
        var searchType = '&searchType=image&alt=json';
       
        request(url + query + searchType, function(error, response, body) {
            if(!error && response.statusCode == 200) {
                var obj = JSON.parse(body);
                var arr = [];
                
                for (var i = 0; i < obj.items.length; i++) {
                    arr.push(queryItem(obj.items[i]));
                }
                
                res.contentType('application/json');
                res.send(arr);
            }
            else
                res.send("Failed! Try again later, might have hit Google API quota.");
        });
    });
};


function queryItem(element) {
    var obj = {
        url: element.link,
        title: element.title,
        snippet: element.snippet,
        mime: element.mime,
        thumbnail: element.image.thumbnailLink,
        image: element.image.contextLink
    }
    
    return obj;
}