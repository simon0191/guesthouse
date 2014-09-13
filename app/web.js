var express = require('express');
var _ = require('underscore');
var path = require('path');
var fs = require('fs');

var app = express();

var publicDir = path.join(__dirname,'/public/');
var vendorDir = path.join(__dirname,'../bower_components/');
var scriptsDir = path.join(publicDir,'/scripts/');
var stylesDir = path.join(publicDir,'/styles/');
var imagesDir = path.join(publicDir,'/images/');

serveIndex(app,['/','/register','/login']);
serveStaticDir(app,'scripts',scriptsDir);
serveStaticDir(app,'images',imagesDir);
serveStaticDir(app,'styles',stylesDir);
serveStaticDir(app,'vendor',vendorDir);

app.get(/^(.*)$/, function(req, res) {
  send404(res);
});


var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});

function serveIndex(app, paths) {
  _(paths).each(function(p) {
    app.get(p, function(req, res) {
      res.sendFile(path.join(publicDir,'index.html'));
    });
  });
}
function serveStaticDir(app, route, localPath) {
  app.get(new RegExp('^/'+route+'/(.*)$'), function(req, res) {
    var filePath = path.join(localPath,req.params[0]);
    console.log('Requesting '+filePath);
    fs.stat(filePath, function(err, stat) {
      if (err || !stat.isFile()) {
        send404(res);
      } else {
        res.sendFile(filePath);
      }

    });
  });
}
function send404(res) {
  res.status(404);
  res.sendFile(path.join(publicDir,'404.html'));
}