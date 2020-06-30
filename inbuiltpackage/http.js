var http = require('http');

var server = http.createServer(function(req,res){
    res.write('<h1>App with NodeJs</h1>')
    res.end()
})

server.listen(5900)