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

app.get('/',(req,res) => {
    res.status(200).send("Hello Ok")
});

//Get the user
app.get('/user',(req,res) => {
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
    db.collection(col_name).insert(req.body,(err,result) => {
        if(err){
            throw err
        }else{
            res.send('Data Added')
        }
    })
});

//updateUser
app.put('/updateUser',(req,res) => {
    db.collection(col_name).update(
        {_id:req.body.id},
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
    db.collection(col_name).remove({_id:req.body.id},(err,result) => {
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
