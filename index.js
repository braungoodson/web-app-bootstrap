/**/

var fs = require('fs');
var fileNames = ['app/index.html'
,'app/css/signin.css'
,'app/css/starter-template.css'
,'app/libraries/sha1-min.js'
];
var files = [];
for (var i in fileNames) {
  (function(file){fs.readFile(file,function(e,d){
        if (e) {
          console.log('Error: Could not read file: %s from:\n %s',e,file);
        } else {
          files[file] = d;
          console.log('Cached: %s',file);
        }
      });}(fileNames[i]))
}

//
var hex_hmac_sha1 = require('sha1-min-0.0.1');

//
var mario = require('mario-mario');
mario.plumbing({
  http: {
    get: {
      '/': function (q,r) {
        return r.setHeader('Content-Type','text/html') 
        + r.send(files[fileNames[0]]);
      },
      '/css/starter-template.css': function (q,r) {
        return r.setHeader('Content-Type','text/css') 
        + r.send(files[fileNames[2]]);
      },
      '/css/signin.css': function (q,r) {
        return r.setHeader('Content-Type','text/css') 
        + r.send(files[fileNames[1]]);
      },
      '/libraries/sha1-min.js': function (q,r) {
        return r.setHeader('Content-Type','text/css') 
        + r.send(files[fileNames[3]]);
      },
      '/signin': function (q,r) {
        var challenge = new Date().getTime();
        var salt = 'This is the salt.';
        q.session.challenge = challenge;
        console.log("Challenge: %s",challenge);
        return r.setHeader('X-Challenge',challenge) 
        + r.setHeader('X-Salt',salt)
        + r.send({challenge:challenge,salt:salt});
      },
      '/signin/name/:name/hash/:hash': function (q,r) {
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
    }
  }
});
