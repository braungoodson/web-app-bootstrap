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
      '/': function (q,r,files,users) {
        return r.setHeader('Content-Type','text/html') + r.send(files[fileCache[0]]);
      },
      '/css/starter-template.css': function (q,r,files,users) {
        return r.setHeader('Content-Type','text/css') + r.send(files[fileCache[2]]);
      },
      '/css/signin.css': function (q,r,files,users) {
        return r.setHeader('Content-Type','text/css') + r.send(files[fileCache[1]]);
      }
    }
  }
});
