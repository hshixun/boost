/*
  for compatibility and performance,
  use tar on linux
  use 7za on windows
  //bin\7za x build\boost_1_62_0.tar -obuild -r -y
*/
//var targz = require('tar.gz');
var os = require('os');
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var async = require('async');
var colors = require('colors/safe');
var sprintf = require('sprintfjs');

module.exports = function(filePath, cb){
  var fname = path.basename(filePath);
  console.log(colors.yellow('extract ' + fname));
  /*
  var t1 = Date.now();
  targz().extract(filePath, path.join(__dirname, "../build"), function(err){
    if(err) return cb(err);
    var t2 = Date.now();
    console.log(colors.grey(sprintf("took %.3f sec",(t2 - t1)/1000)));
    return cb(null);
  }); 
  */
  var toPath = path.join(__dirname, "../build");
  var binPath = path.join(__dirname, "../bin");
  var tarName = path.basename(fname, ".gz");
  var tarPath = path.join(toPath, tarName);
  var exePath = path.join(binPath,  "7za.exe");
  
  var platform = os.platform();
  if(platform == 'darwin' || platform == 'freebsd' ||
     platform == 'linux' || platform == 'openbsd'){
    async.waterfall([
      function(next){
        var cmd = sprintf("tar xf %s -C %s", filePath, toPath);
        console.log(cmd);
        child_process.exec(cmd, next);
      }
    ], cb);
  } else if(platform == 'win32'){
    async.waterfall([
      function(next){
        var cmd = sprintf("%s x %s -o%s -r -y", exePath, filePath, toPath);
        console.log(cmd);
        child_process.exec(cmd, next);
      }, function(stdout, stderr, next){
        var cmd = sprintf("%s x %s -o%s -r -y", exePath, tarPath, toPath);
        console.log(cmd);
        child_process.exec(cmd, next);
      }, function(stdout, stderr, next){
        fs.unlink(tarPath, next);
      }
    ], cb);
  }
}
