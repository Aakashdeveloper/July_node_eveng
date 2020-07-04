var express = require('express');
var app = express();
var port = process.env.PORT || 8700;
var morgan = require('morgan');
var chalk = require('chalk');

var menu = [
  {'name':'Home','link':'/'},
  {'name':'Restaurants','link':'/restaurants'},
  {'name':'City','link':'/city'}
]
var restaurantsRouter = require('./src/routes/restaurantsRoute')(menu);
var cityRouter = require('./src/routes/cityRoutes')(menu);

//Static File path
app.use(express.static(__dirname+'/public'));
//html
app.set('views','./src/views');
//view engine
app.set('view engine','ejs');

//For logs
app.use(morgan('tiny'))

app.get('/',function(req,res){
    //res.send("<h1>Hiii From express</h1>")
    res.render('home',{title:'Home Page',menu:menu})
});

app.use('/restaurants',restaurantsRouter);
app.use('/city',cityRouter);


app.listen(port,function(err){
    if(err) throw err;
    console.log(chalk.blue('Server is running on port '+port));
})

