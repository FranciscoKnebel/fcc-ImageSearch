var dotenv  = require("dotenv");
var request = require("request");
var time    = require("time")(Date);
var isNumeric = require("is-number");
var latest  = require("./models/latest");

const DEFAULT_OFFSET = 0;
const DEFAULT_COUNT  = 10;
const DEFAULT_LATEST = 10;

module.exports = function(app, db, dirname) {
    
    app.get('/search/:query', function(req, res) {
        var count  = parameterValue(req.query.count, DEFAULT_COUNT);
        var offset = parameterValue(req.query.offset, DEFAULT_OFFSET);

        addQueryToRecentsList(req.params.query);
        
        searchAndSendBingImages(res, req.params.query, count, offset);
        
    });
    
    app.get('/latest', function(req, res) {
        //Get latest queries from DB, from latest to newest.
        
        latest.find({}).sort({ date: -1 }).exec( function(err, docs) {
            if(err)
                console.error(err);
                
            var arr = [];
            for (var i = 0; i < docs.length && i < DEFAULT_LATEST; i++) {
                arr.push({query: docs[i].query, date: docs[i].date});
            }
            
            res.contentType('application/json');
            res.send(arr);
        });
    });
    
    db.on  ('error', console.error.bind(console, 'connection error:'));
};

function searchAndSendBingImages(res, query, count, offset) {
    //Bing Search
    var url = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=" + query + "&count=" + count + "&offset=" + offset;
    const options = {
        url: url,
        headers: {
            "Ocp-Apim-Subscription-Key": process.env.BING_API
        }
    };
    
    request(options, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            var obj = JSON.parse(body);
            var arr = [];
            
            for (var i = 0; i < obj.value.length; i++)
                arr.push(queryItem(obj.value[i]));

            res.contentType('application/json');
            res.send(arr);
        }
        else {
            res.send("Failed searching with Bing.");
        }
    });
}

function addQueryToRecentsList(query) {
    //Add query with current time to db
    var currentDate = new Date();
    var newQuery = new latest({query: query, date: currentDate.toUTCString()});
    
    newQuery.save(function(err, doc) {
        if(err)
            console.error(err);
    });
}

function queryItem(element) {
    var obj = {
        image: element.contentUrl,
        title: element.name,
        thumbnail: element.thumbnailUrl,
        host: element.hostPageDisplayUrl,
        width: element.width,
        height: element.height
    }
    
    return obj;
}

function parameterValue(parameter, defaultValue) {
    var value = defaultValue;
    if(isNumeric(parameter))
        value = parameter;
    
    return value;
}