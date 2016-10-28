var os = require('os');
var fs = require('fs');
var path = require('path');
var async = require('async');
var colors = require('colors/safe');
var sprintf = require('sprintfjs');
var runCommand = require('./runCommand');

module.exports = function(buildPath, cb){
  console.log(buildPath);
  var basen = path.basename(buildPath);
  console.log(colors.yellow('build ' + basen));
  var icuPath = path.join(__dirname, "../third_party/icu");
  var boostPath = path.join(__dirname, "../third_party/boost");
  var platform = os.platform();
  if(platform == 'darwin' || platform == 'freebsd' ||
     platform == 'linux' || platform == 'openbsd'){
    async.waterfall([
      function(next){
        var cmd = path.join(buildPath, "bootstrap.sh");
        runCommand({
          cmd: cmd,
          opts: [
            '--with-icu=' + icuPath,
            '--prefix=' + boostPath
          ],
          text: 'build boost: booststrap',
          cwd: buildPath}, next);
      }, function(next){
        var cmd = path.join(buildPath, "b2");
        runCommand({
          cmd: cmd,
          opts: [
            '-sICU_PATH=' + icuPath,
            'install'
          ],
          text: 'build boost: b2',
          cwd: buildPath}, next);
      }
    ], cb);
  } else if(platform == 'win32'){
    cb(null);//TODO
  }
}
