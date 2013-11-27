/**/

//
var fs = require('fs');
var fileNames = [
  'app/index.html'
  ,'app/css/starter-template.css'
  ,'app/css/signin.css'
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
function User (o) {
  this.name = o.name;
  this.password = o.password;
  this.data = o.data;
}
User.prototype.getUser = function () {
  return {
    name: this.name,
    data: this.data
  }
}
var users = [];
users['braun'] = new User({name:'braun',password:'braun',data:null});
users['braun1'] = new User({name:'braun1',password:'braun1',data:null});
//,getUser:function(){return{name:this.name,data:this.data}}};

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
      '/signin/:name/:password': function (q,r) {
        if (users[q.params.name]) {
          if (q.session.attempts) {
            q.session.attempts++;
            if (q.session.attempts > 3) {
              return r.send(403);
            }
          } else {
            q.session.attempts = 1;
          }
          if (users[q.params.name].password == q.params.password) {
            var user = users[q.params.name].getUser();
            q.session.signedin = true;
            q.session.user = user;
            return r.setHeader('Content-Type','application/json')
            + r.send(200,{user:user});
          }
        }
        return r.send(401);
      },
      '/signup/:name/:password': function (q,r) {
        console.log(q.session.attempts)
        if (q.session.attempts) {
          q.session.attempts++;
          if (q.session.attempts > 3) {
            return r.send(403);
          }
        } else {
          q.session.attempts = 1;
        }
        if (!users[q.params.name]) {
          var u = q.params;
          var user = new User({name:u.name,password:u.password,data:null});
          users[user.name] = user;
          q.session.signedin = true;
          q.session.user = user;
          return r.setHeader('Content-Type','application/json')
          + r.send(200,{user:user.getUser()});
        } else {
          return r.send(400);
        }
      }
    }
  }
});
