var fs = require('fs');
var cache = {
  add: function (file) {
    fs.readFile(file,function(e,d){
      if (e) {
        console.log('Error: Could not read file: %s',file);
      } else {
        cache.files[file] = d;
        console.log('Cache: Added %s!',file);
      }
    });
  },
  files: []
}
cache.add('app/index.html');
cache.add('app/css/starter-template.css');
var mario = require('mario-mario');
mario.plumbing({
  port: process.env.PORT || 10000,
  http: {
    get: {
      '/': function (q,r) {
        return r.setHeader('Content-Type','text/html') + r.send(cache.files['app/index.html']);
      },
      '/css/starter-template.css': function (q,r) {
        return r.setHeader('Content-Type','text/css') + r.send(cache.files['app/css/starter-template.css']);
      }
    }
  }
});
