const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('./UserSchema');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//Register User
router.post('/register',(req,res) => {
    var hashedpassword = bcrypt.hashSync(req.body.password,8);
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashedpassword,
        role:req.body.role?req.body.role:'User',
    },(err,user) => {
        if(err) return res.status(500).send("Error in resgiter");
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Access-Comtrol-Allow-Headers','Origin, X-Requested-With,Content-Type,Accept');
        res.status(200).send("Regsitration Successful");
    })
})

module.exports = router;
