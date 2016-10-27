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
  var toPath = path.join(__dirname, "../build");
  var binPath = path.join(__dirname, "../bin");
  var exePath = path.join(binPath,  "7za.exe");
  var extractPath = path.join(toPath, "icu");
  
  var platform = os.platform();
  if(platform == 'darwin' || platform == 'freebsd' ||
     platform == 'linux' || platform == 'openbsd'){
    cmd = sprintf("tar xf %s -C %s", filePath, toPath);
  } else if(platform == 'win32'){
    cmd = sprintf("%s x %s -o%s -r -y", exePath, filePath, toPath);
  } else {
    return cb('not support');
  }
  console.log(cmd);
  child_process.exec(cmd, function(err){
    if(err) return cb(err);
    return cb(null, extractPath);
  });
}
