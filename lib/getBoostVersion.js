var request = require('request');
var async = require('async');

module.exports = function(cb){
  var url = "http://www.boost.org/users/download/";
  var boostVer;
  //https://sourceforge.net/projects/boost/files/boost/1.62.0/
  request(url , function (err, res, body) {
    if(err) return cb(err);
    if(res.statusCode!=200) return cb({status: res.statusCode});
    var matches = body.match(/(https:\/\/sourceforge.net\/projects\/boost\/files\/boost\/([0-9.]+)\/)/);
    if(matches.length == 3) {
      //matches[1] is the download page url
      return cb(null, matches[2]);//version
    }
    return cb({status: 500, message:'version not found'});
  });
}