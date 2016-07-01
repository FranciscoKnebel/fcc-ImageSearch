var dotenv  = require("dotenv");
var request = require("request");
var time    = require("time")(Date);
var latest  = require("./models/latest");

module.exports = function(app, db, dirname) {
    
    app.get('/search/:query', function(req, res) {
        var url = 'https://www.googleapis.com/customsearch/v1?key=' + process.env.GOOGLE_API + '&cx=' + process.env.CSE_ID;
        var query = '&q=' + req.params.query;
        var searchType = '&searchType=image&alt=json';
        
        //Add query with current time to db
        var currentDate = new Date();
        var newQuery = new latest({query: req.params.query, date: currentDate.toUTCString()});
        newQuery.save(function(err) {
            if(err)
                console.error(err);
            
            console.log(newQuery);
        });
        
        
        //Bing Search
        var urlBing = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=" + req.params.query + "&count=10" + "&offset=10";
        const options = {
            url: urlBing,
            headers: {
                "Ocp-Apim-Subscription-Key": process.env.BING_API
            }
        }
        
        request(options, function(error, response, body) {
            if(!error && response.statusCode == 200) {
                var obj = JSON.parse(body);
                var arr = [];
                
                for (var i = 0; i < obj.value.length; i++)
                    arr.push(queryItemBing(obj.value[i]));

                res.contentType('application/json');
                res.send(arr);
            }
            else {
                res.send("Failed searching with Bing.");
            }
        });
    });
    
    
    db.on  ('error', console.error.bind(console, 'connection error:'));
    
    db.once('open' , function() {});
};


function queryItem(element) {
    var obj = {
        url: element.link,
        title: element.title,
        thumbnail: element.image.thumbnailLink
    }

    return obj;
}

function queryItemBing(element) {
    var obj = {
        url: element.contentUrl,
        title: element.name,
        thumbnail: element.thumbnailUrl
    }
    
    return obj;
}