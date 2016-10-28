var os = require('os');
var fs = require('fs');
var path = require('path');
var async = require('async');
var colors = require('colors/safe');
var sprintf = require('sprintfjs');
var runCommand = require('./runCommand');

module.exports = function(buildPath, cb){
  console.log(colors.yellow('build icu'));
  var platform = os.platform();
  if(platform == 'darwin' || platform == 'freebsd' ||
     platform == 'linux' || platform == 'openbsd'){
    async.waterfall([
      function(next){
        var cmd = path.join(buildPath, "configure");
        var installPath = path.join(__dirname, "../third_party/icu");
        console.log(buildPath);
        runCommand({
          cmd: cmd, 
          opts: ['--prefix=' + installPath],
          text: 'build icu: configure',
          cwd: buildPath}, next);
      }, function(next){
        runCommand({cmd: "make", text: 'build icu: make',
          cwd: buildPath}, next);
      }, function(next){
        runCommand({cmd: "make", opts: ['install'],
          text: 'build icu: make install',
          cwd: buildPath}, next);
      }
    ], function(err, result){
      cb(err);
    });
  } else if(platform == 'win32'){
    cb(null);//TODO
  }
}
