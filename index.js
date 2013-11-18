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
      },
      '/signin/:token': function (q,r,files,users) {
        // if user exists
        // if user does not exist
        // if password is correct
        // if password is incorrect
        /*

        */
        console.log(q.params.token);
        return r.setHeader('Content-Type','application/json') + r.send({name:'braungoodson@gmail.com'});
      }
    },
    post: {
      '/signin': function (q,r,files,users) {
        // if user exists
        // if user does not exist
        // if password is correct
        // if password is incorrect
        /*

        */
        console.log(q.params);
        return r.setHeader('Content-Type','application/json') + r.send({name:'braungoodson@gmail.com'});
      }
    }
  }
});
