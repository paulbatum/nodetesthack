var request = require('request');

module.exports = {
    "post": function (req, res, next) {       
        req.azureMobile.user.getIdentity("google").then(function(result) {
            request.get('https://www.googleapis.com/plus/v1/people/me', {
               headers: {
                   "Authorization": "Bearer " + result.google.access_token 
               }
            }, function(err, apiResult) {
                var results = JSON.parse(apiResult.body);
                res.send(apiResult.statusCode, { result: results });    
            });                
        });
    }
};
