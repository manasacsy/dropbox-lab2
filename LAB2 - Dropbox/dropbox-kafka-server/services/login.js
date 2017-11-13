//var mongo = require("./mongo");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/dropbox";
var bcrypt = require('bcrypt');
function handle_login(msg, callback){
    console.log("In handle request login dropbox:"+ JSON.stringify(msg));
    MongoClient.connect(url, function(err, db) {
  if (err) throw err;
 db.collection("user").findOne({"userid":msg.username}, function(err, mongores) {
    if (err) throw err;
    console.log("1 document found"  + mongores);
    db.close();
      callback(null, mongores);
  });
});
}
function handle_signup(msg, callback){
    console.log("In handle request login dropbox:"+ JSON.stringify(msg));
    MongoClient.connect(url, function(err,db){
        if (err) throw err;
        
               db.collection("user").insertOne(msg.data, function(err, mongores) {
    if (err){
        	throw err;
    }
                    else{
                        callback(null, mongores.ops);
                    }
    
  });
            });
}
exports.handle_login = handle_login;
exports.handle_signup = handle_signup;