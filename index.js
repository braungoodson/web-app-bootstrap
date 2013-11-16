/**/

//
var fileCache = [];
fileCache.push('app/index.html');
fileCache.push('app/css/starter-template.css');
fileCache.push('app/css/login.css');

//
var mario = require('mario-mario');
mario.plumbing({
  port: process.env.PORT || 10000,
  fileCache: fileCache,
  http: {
    get: {
      '/': function (q,r,c) {
        return r.setHeader('Content-Type','text/html') + r.send(c.files[fileCache[0]]);
      },
      '/css/starter-template.css': function (q,r,c) {
        return r.setHeader('Content-Type','text/css') + r.send(c.files[fileCache[1]]);
      },
      '/css/login.css': function (q,r,c) {
        return r.setHeader('Content-Type','text/css') + r.send(c.file[fileCache[2]]);
      }
    }
  }
});
