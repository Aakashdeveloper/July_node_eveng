var express = require('express');
var restaurantsRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017"

function Router(menu){

restaurantsRouter.route('/')
    .get(function(req,res){
        mongodb.connect(url,function(err,dc){
          if(err){
            res.status(501).send('Error While Connecting')
          }else{
            const dbo = dc.db("restaurants");
            dbo.collection('restaurant').find({}).toArray((err,data) =>{
              if(err){
                res.status(501).send('Error While fetching')
              }else{
                res.render('restaurant',{title:'Restaurant Page',menu:menu,restaurants:data})
              }
            })
          }
        })
        //res.render('restaurant',{title:'Restaurant Page',menu:menu,restaurants:restaurants})
    })

restaurantsRouter.route('/details/:id')
    .get(function(req,res){
      //var id = req.params.id
      var {id} = req.params
      mongodb.connect(url,function(err,dc){
        if(err){
          res.status(501).send('Error While Connecting')
        }else{
          const dbo = dc.db("restaurants");
          dbo.collection('restaurant').findOne({_id:parseInt(id)},(err,data) =>{
            if(err){
              res.status(501).send('Error While fetching')
            }else{
              res.render('restaurantDetails',{menu:menu,details:data})
            }
          })
        }
      })
     
    })

    return restaurantsRouter
}


module.exports = Router;