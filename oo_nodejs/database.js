import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";
var dbname="nodeat10";

const MainCall = {};

var output;

MainCall.getData = (colName) => {
    MongoClient.connect(url,(err,db) => {
        if(err) throw err;
        var dbo = db.db(dbname);
        dbo.collection(colName).find({}).toArray((err,result) => {
            if(err) throw err;
            console.log('Data Fetched');
            output = result
        })
    })
    return output
}


MainCall.postData = (colName,dbObj) => {
    MongoClient.connect(url,(err,db) => {
        if(err) throw err;
        var dbo = db.db(dbname);
        dbo.collection(colName).insert(dbObj,(err,result) => {
            if(err) throw err;
            console.log('Data Added');
           db.close()
        })
    })
    let out = `Data inserted in ${colName}`
    return out
}


export default MainCall