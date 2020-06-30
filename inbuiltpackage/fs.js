var fs = require('fs');

/*fs.writeFile('mytest.txt','This is from nodeFs nareshit',function(err){
    if(err) throw err;
    console.log('File Crreated')
})

fs.appendFile('mytest.txt',Math.floor(Math.random()*(20-1))+1+' This is from nodeFs nareshit\n',function(err){
    if(err) throw err;
    console.log('File Crreated')
})


fs.rename('mytest.txt','myText.txt',function(err){
    if(err) throw err;
    console.log("File remaned")
})


fs.unlink('myText.txt',function(err){
    if(err) throw err;
    console.log("File deleted")
})*/

fs.readFile('db.json','utf-8',function(err,data){
    if(err) throw err;
    console.log(data)
})