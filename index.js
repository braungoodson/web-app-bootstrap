/**/

//
var fileCache = [];
fileCache.push('app/index.html');
fileCache.push('app/css/signin.css');
fileCache.push('app/css/starter-template.css');
fileCache.push('app/libraries/sha1-min.js');

//
var hex_hmac_sha1 = require('sha1-min-0.0.1');

//
var mario = require('mario-mario');
mario.plumbing({
  port: process.env.PORT || 10000,
  fileCache: fileCache,
  http: {
    get: {
      '/': function (q,r,files,users) {
        return r.setHeader('Content-Type','text/html') 
        + r.send(files[fileCache[0]]);
      },
      '/css/starter-template.css': function (q,r,files,users) {
        return r.setHeader('Content-Type','text/css') 
        + r.send(files[fileCache[2]]);
      },
      '/css/signin.css': function (q,r,files,users) {
        return r.setHeader('Content-Type','text/css') 
        + r.send(files[fileCache[1]]);
      },
      '/libraries/sha1-min.js': function (q,r,files,users) {
        return r.setHeader('Content-Type','text/css') 
        + r.send(files[fileCache[3]]);
      },
      '/signin': function (q,r,files,users) {
        var challenge = new Date().getTime();
        var salt = 'This is the salt.';
        q.session.challenge = challenge;
        console.log("New Challenge!");
        return r.setHeader('X-Challenge',challenge) 
        + r.setHeader('X-Salt',salt)
        + r.send('');
      },
      '/signin/name/:name/hash/:hash': function (q,r,files,users) {
        var signin = false;
        var hash = q.params.hash;
        var challenge = q.session.challenge;
        var salt = 'This is the salt.';
        var user = users[q.params.name];
        var h = hex_hmac_sha1(user.password,salt);
        h = hex_hmac_sha1(h,challenge);
        if (h == hash) {
          signin = true
        } else {
          signin = false;
        }
        q.session.challenge = new Date().getTime();
        return r.setHeader('Content-Type','application/json') 
        + r.send({signin:signin});
      }
    },
    post: {}
  }
});
