/**/

//
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
          console.log('Error: Could not read file: %s from:\n %s'
            ,e,file);
        } else {
          files[file] = d;
          console.log('Cached: %s',file);
        }
      });}(fileNames[i]))
}

//
var users = [];
users['braun'] = {name:'braun',password:'braun',data:null,getUser:function(){return{name:this.name,data:this.data}}};

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
      '/signin/:name/:password': function (q,r) {
        if (users[q.params.name]) {
          if (users[q.params.name].password == q.params.password) {
            var user = users[q.params.name].getUser();
            return r.setHeader('Content-Type','application/json')
            + r.send(200,{user:user});
          }
        }
        return r.send(403);
      }
    }
  }
});
