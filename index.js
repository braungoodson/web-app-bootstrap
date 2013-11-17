/**/

//
var fileCache = [];
fileCache.push('app/index.html');
fileCache.push('app/css/signin.css');
fileCache.push('app/css/starter-template.css');

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
        return r.setHeader('Content-Type','text/css') + r.send(c.files[fileCache[2]]);
      },
      '/css/signin.css': function (q,r,c) {
        return r.setHeader('Content-Type','text/css') + r.send(c.file[fileCache[1]]);
      }
    }
  }
});
