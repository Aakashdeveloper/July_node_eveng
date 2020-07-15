const express = require('express');
const app = express();
const port = process.env.PORT || 9900;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
var bodyParser = require('body-parser');
const cors = require('cors');
const mongourl = "mongodb://localhost:27017";
let db;
let col_name="nodeat8";

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine','ejs');

app.get('/health',(req,res) => {
    res.status(200).send("Hello Ok")
});

//Get all user
app.get('/',(req,res) => {
    db.collection(col_name).find({isActive:true}).toArray((err,result) => {
        if(err) throw err
        res.render('index',{data:result})
    });
});


//Get all user
app.get('/new',(req,res) => {
    var random =Math.floor(Math.random()*10000)
    res.render('admin',{id:random})
});


//Get the user
app.get('/users',(req,res) => {
    var query ={}
    if(req.query.id){
        query={_id:parseInt(req.query.id),isActive:true}
    }
    else if(req.query.city){
        query={city:req.query.city,isActive:true}
    }else{
        query={isActive:true}
    }
   
    db.collection(col_name).find(query).toArray((err,result) => {
        if(err) throw err
        res.send(result)
    });
});

//Add the user
app.post('/addUser',(req,res) => {
    console.log(req.body);
    const data = {
        "_id":parseInt(req.body._id),
        "name":req.body.name,
        "city":req.body.city,
        "phone":req.body.phone,
        "isActive":true
    }
    db.collection(col_name).insert(data,(err,result) => {
        if(err){
            throw err
        }else{
            res.redirect('/')
        }
    })
});

//updateUser
app.put('/updateUser',(req,res) => {
    console.log(req.query)
    console.log(req.body)
    db.collection(col_name).update(
        
        {_id:parseInt(req.body._id)},
        {
            $set:{
                name:req.body.name,
                city:req.body.city,
                phone:req.body.phone,
                isActive:true
            }
        },(err,result) => {
            if(err){
                throw err
            }else{
                res.send('Data Updated')
            }
        }
    )
});

//Delete User
app.delete('/deleteUser',(req,res) => {
    db.collection(col_name).remove({_id:parseInt(req.body.id)},(err,result) => {
        if(err){
            throw err
        }else{
            res.send('Data Deleted')
        }
    })
})


MongoClient.connect(mongourl,(err,client) => {
    if(err) console.log(err);
    db=client.db('classpractice');
    app.listen(port,(err) => {
        console.log(`Server is running on port ${port}`)
    })
})
