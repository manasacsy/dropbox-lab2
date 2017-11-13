var MongoClient = require('mongodb').MongoClient;
var mongoURL = "mongodb://localhost:27017/dropbox";
var mongo = require("./mongo");
var mongo1 = require('mongodb');

function handle_getfiles(msg, callback){
    console.log("In handle request files dropbox:");
     if(msg.data.currentFolder === null || msg.data.currentFolder=== "null"){
       mongo.connectPool(mongoURL, function(db){
                var coll = db.collection('user');
                coll.findOne({userid: msg.data.userid}, function(err, user){
                    mongo.release(db);
                    if (user) {
                        
                        callback(null, user.data)
                        

                    } else {
                        callback(null, err);
                    }
                });
            });  
    }
    else{
          mongo.connectPool(mongoURL, function(db){
        var o_id = new mongo1.ObjectID(msg.data.currentFolder);
                var coll = db.collection('folders');
                coll.findOne({_id: o_id}, function(err, docs){
                    mongo.release(db);
                    console.log(docs);
                    if (docs) {
                        callback(null, docs.data);
                    } else {
                      callback(null, err);
                    }
                });
            });
    }
}

function handle_createfolder(msg, callback){
    var folderName = msg.data.name;
    var inFolder = msg.data.inFolder;
    var userid =  msg.data.userid;
    var resultspre;
   
     mongo.connectPool(mongoURL, function(db){
        var folderObj = {
            "foldername" : folderName,
            "activityIndicator" : true,
            "data":[]
        }
      //  var newvalues = { $push: { data: myobj } };
                var coll = db.collection('folders');
                coll.insertOne(folderObj, function(err, mongores) {
                    mongo.release(db);
    if (err){
        	//res.status(401).json({data: err});
        callback(null, err);
    }
                    else{
                        
                        
                        mongo.connectPool(mongoURL, function(db){
        var myobj = {
            "folderid" : mongores.ops[0]._id,
            "filename" : folderName,
            "filetype" : 1,
            "owner" : true,
            "star" : false,
            "activityIndicator" : true
        }
        
        var newvalues = { $push: { data: myobj } };
                            var myquery;
                            var o_id;
                            if(inFolder === 'null'){
                var coll = db.collection('user');
                                 myquery = { userid: userid };
                            }
                            else{
                    var coll = db.collection('folders'); 
                                 o_id = new mongo1.ObjectID(inFolder);
                                 myquery = { _id: o_id};
                                 console.log("inserting in  or folder" + mongores.ops._id)
                            }
                            
                coll.updateOne(myquery, newvalues, function(err, mongores) {
                    mongo.release(db);
    if (err){
         callback(null, err);
    }
                    else{
                        if(inFolder === 'null'){  
                            
                            msg.data.currentFolder = inFolder;
                            handle_getfiles(msg,callback);
                                                          
                                                          }
                        else{
                            mongo.connectPool(mongoURL, function(db){
        var o_id = new mongo1.ObjectID(inFolder);
                                
                var coll = db.collection('folders');
                coll.findOne({_id: o_id}, function(err, docs){
                    mongo.release(db);
                    if (docs || docs === null) {
                         callback(null, docs.data);
                       
                        

                    } else {
                       callback(null, err);
                    }
                });
            });
                        }
                    }
    
  });
            }); 
                        
                    
                    }
    
  });
                        }
                       
            ); 
}
function handle_star(msg, callback){
    mongo.connectPool(mongoURL, function(db){
        var myquery = { userid: msg.data.userid };
        var newvalues = { $set: { data: msg.data.data } };
                var coll = db.collection('user',db);
                coll.updateOne(myquery, newvalues, function(err, mongores) {
                    mongo.release(db);
    if (err){
        	res.status(401).json({data: err});
    }
                    else{
                       
                        msg.data.currentFolder = null;
                       handle_getfiles(msg,callback); 
                    }
    
  });
            });
}
function handle_share(msg, callback){
    if(msg.data.restype === 'file'){   
        mongo.connectPool(mongoURL, function(db){             
        var myquery;
        var newvalues = { $push: { data: msg.data.tempdata } };
                var coll = db.collection('user');
                                 myquery = { userid: msg.data.userid };      
                coll.updateOne(myquery, newvalues, function(err, mongores) {
                    mongo.release(db);
    if (err){
         callback(null, err);
        	//res.status(401).json({data: err});
    }
                    else{
                        
                        handle_getfiles(msg, callback);
                        //getFiles(userid,res,currentFolder);
                    }
  });
            });
    }
    else{
          
              var folderData;
              
    mongo.connectPool(mongoURL, function(db){
        var o_id = new mongo1.ObjectID(msg.data.folderid);
                var coll = db.collection('folders');
                coll.findOne({_id: o_id}, function(err, docs){
                    
                    if (docs) {
                        
                       folderData = docs.data;
        var folderObj = {
            "foldername" : msg.data.filename,
            "activityIndicator" : true,
            "data":folderData
        }

                var coll = db.collection('folders');
                coll.insertOne(folderObj, function(err, mongores) {
                    mongo.release(db);
    if (err){
        callback(null, err);
        	//res.status(401).json({data: err});
    }
                    else{
                        
                             //insert into users
                        mongo.connectPool(mongoURL, function(db1){
                            var o_id =  new mongo1.ObjectID(mongores.ops[0]._id);          msg.data.tempdata.folderid = o_id;
        
        var newvalues = { $push: { data: msg.data.tempdata } };
                            var myquery;
                            
                            var coll = db1.collection('user');
                                 myquery = { userid: msg.data.userid  };
                            
                coll.updateOne(myquery, newvalues, function(err, mongores) {
                    mongo.release(db1);
    if (err){
         callback(null, err);
        	//res.status(401).json({data: err});
    }
                    else{
                        callback(null, {data: "success"});
                        //res.status(200).json({data: "success"});
                    }
    
  });
            }); 
                        
                    
                    }
    
  });
                        }   

                    else {
                      folderData = null;
                    }
                });
            });
                

}
    
}
function handle_creategroup(msg, callback){
    mongo.connectPool(mongoURL, function(db){
               db.collection("groups").insertOne(msg.data, function(err, mongores) {
                   mongo.release(db);
    if (err){
        	throw err;
    }
                    else{
                        callback(null, mongores.ops);
                    }
    
  });
            });
}
function handle_getgroups(msg, callback){
    console.log("msg.data.userid:")
        console.log(msg.data)
     mongo.connectPool(mongoURL, function(db){
               db.collection("groups").find({"members.userid": msg.data}).toArray(function(err, mongores) {
                mongo.release(db);
    if (err){
        	callback(null, false);
    }
                    else{
                        console.log(mongores);
                        callback(null, mongores);
                    }
    
  });
            });
}
exports.handle_creategroup = handle_creategroup;
exports.handle_getfiles = handle_getfiles;
exports.handle_createfolder = handle_createfolder;
exports.handle_star=handle_star;
exports.handle_share = handle_share;
exports.handle_getgroups = handle_getgroups;