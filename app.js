var fs = require('fs');
var http = require('http');
var formidable = require('./f/index');
var path = require('path');
var PORT = process.env.VCAP_APP_PORT || 3300;

http.createServer(function(req, res){
  if(req.url == '/img') {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, "./tmp/");

    if(!fs.existsSync(form.uploadDir)) {
      fs.mkdir(form.uploadDir);
    }

    form.parse(req, function(error, fields, files) {
      res.writeHead(200, {
        "access-control-allow-origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        "Content-Type": "text/javascript"
      });
      res.write(JSON.stringify({
        code: 200,
        path: files.img && files.img.path && files.img.path.split("/").pop()
      }));
      res.end();

      setTimeout(function(){
        // 十分钟后删除文件
        fs.unlinkSync(files.img.path);
      }, 1000 * 60 * 10);
    });
  } else if(req.url.indexOf('tmp') > -1) {
    var filePath = path.join(__dirname, "./" + req.url);
    res.writeHead(200, {
      "Content-Type": "image/png"
    });
    if(fs.existsSync(filePath)){
      res.write(fs.readFileSync(filePath));
    } else {
      res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
      res.write("<h1><a href='http://barretlee.com/'>小胡子哥</a>告诉你：404了~</h1>", 'utf-8');
    }
    res.end();
  } else {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write("<h1><a href='http://barretlee.com/'>小胡子哥</a>告诉你：404了~</h1>", 'utf-8');
    res.end();
  }
}).listen(PORT, function(){
  console.log('Listen at http://0.0.0.0:' + PORT);
});
