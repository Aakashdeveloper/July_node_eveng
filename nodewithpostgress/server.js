const express = require('express');
const app = express()
const port = 3400;
const bodyParser = require('body-parser')

var Pool = require('pg').Pool;
var pool = new Pool({
    user:'postgres',
    host:'',
    port:'5432',
    database:'postgres',
    password:'admin987'
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.get('/user',(req,res) => {
    pool.query('SELECT * from emp',(err,data) => {
        if(err){
            throw err;
        }else{
            res.status(200).send(data.rows)
        }
    })
})

app.post('/user',(req,res) => {
    let firstname = req.body.firstname;
    let rollno = req.body.rollno;
    pool.query('INSERT INTO "emp"(firstname,rollno) VALUES ($1,$2);',[firstname,rollno],(err,result) => {
        if(err) throw err;
        res.status(200).send('data added')
    })
})


app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})