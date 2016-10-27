var targz = require('tar.gz');
var path = require('path');
var colors = require('colors/safe');
var sprintf = require('sprintfjs');

module.exports = function(filePath, cb){
  console.log(colors.yellow('extract ' + path.basename(filePath)));
  var t1 = Date.now();
  targz().extract(filePath, path.join(__dirname, "../build"), function(err){
    if(err) return cb(err);
    var t2 = Date.now();
    console.log(colors.grey(sprintf("took %.3f sec",(t2 - t1)/1000)));
    return cb(null);
  }); 
}