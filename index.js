var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var async = require('async');
var request = require('request');
var getBoostVersion = require('./lib/getBoostVersion');
var downloadBoost = require('./lib/downloadBoost');
var extractBoost = require('./lib/extractBoost');
var buildBoost = require('./lib/buildBoost');
var downloadICU = require('./lib/downloadICU');
var extractICU = require('./lib/extractICU');
var buildICU = require('./lib/buildICU');

var downloadDir = path.join(__dirname, "download");
var buildDir = path.join(__dirname, "build");
var installDir = path.join(__dirname, "third_party");

if(!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir);
if(!fs.existsSync(buildDir)) fs.mkdirSync(buildDir);
if(!fs.existsSync(installDir)) fs.mkdirSync(installDir);

async.waterfall([
  downloadICU,
  extractICU,
  buildICU,
  getBoostVersion,
  downloadBoost,
  extractBoost,
  buildBoost
], function(err, result){
  if(err){
    console.log(err);
    return;
  }
  console.log('done');
});
