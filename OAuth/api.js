var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var superagent = require('superagent');
var request = require('request');
var port = 7800;

//Static File path
app.use(express.static(__dirname+'/public'));
//html
app.set('views','./src/views');
//view engine
app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.render('index')
});

app.get('/user',(req,res) => {
    const code = req.query.code;
    if(!code){
        res.send({
            success:false,
            message:'Error on login'
        })
    }
    superagent
    .post('https://github.com/login/oauth/access_token')
    .send({
        client_id:"a509983d532b0f8320f1",
        client_secret:"b1a22ad3e1f7c2d0182bf3bf9a359c60edfeb023",
        code:code
    })
    .set('Accept','application/json')
    .end((err,result) => {
        if(err) throw err;
        var accesstoken = result.body.access_token
        const option = {
            url:'https://api.github.com/user',
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Authorization':'token '+accesstoken,
                'User-Agent':'july-node'
            }
        }
        var output;
        request(option,(err,response,body)=>{
            output=body;
            return res.send(output)
        })
    })
})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})