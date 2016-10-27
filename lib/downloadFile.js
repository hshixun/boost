var fs = require('fs');
var path = require('path');
var request = require('request');
var progress = require('progress');
var requestProgress = require('request-progress');
var colors = require('colors/safe');
var prettysize = require('prettysize');
var cols = process.stdout.columns;

/*
  data = {savePath:
          url:
          filename:}
*/
module.exports = function(data, cb){
  var savePath = data.savePath;
  var savePathPart = savePath + ".part";
  var url = data.url;
  var fname = data.filename;
        
  console.log(colors.yellow('downloading ' + fname));
  var barWidth = cols - 20;
  if(barWidth < 20) barWidth = 20;
  var speed = "0 bytes/s";
  var bar = new progress('[:bar] :percent :speed', {
      complete: colors.grey('='),
      incomplete: ' ',
      width: barWidth,
      total: 100
  });
  
  var statusCode = 0;
  var contentLength = 0;
  var reqHandle = request(url);
  var skipDownload = false;
  requestProgress(reqHandle,{}).on('response', function(response){
    statusCode = response.statusCode;
    if(statusCode == 200){
      contentLength = response.headers["content-length"] | 0;
      console.log(colors.yellow('Content-Length:' + contentLength + ' bytes'));
      if(fs.existsSync(savePath)){
        var stats = fs.statSync(savePath);
        if(stats.size == contentLength){
          //TODO md5 or sha check
          console.log(colors.green('file exists, skip downloading'));
          skipDownload = true;
          reqHandle.abort();
        }
      }
    } else {
      skipDownload = true;
      reqHandle.abort();
    }
  }).on('progress', function(state){
    speed = prettysize(state.speed) + "/s";
    bar.update(state.percentage, {speed: speed});
  }).on('error', function (err) {
    cb(err);
  }).on('end', function () {
    bar.update(100, {speed: speed});//final update bar
    if(skipDownload){
      if(fs.existsSync(savePathPart)){
        fs.unlinkSync(savePathPart);
      }
    }
    if(statusCode!=200) return cb({status: statusCode});
    
    if(fs.existsSync(savePathPart)){
      fs.renameSync(savePathPart , savePath);
    }
    return cb(null, savePath);
  }).pipe(fs.createWriteStream(savePathPart));
}