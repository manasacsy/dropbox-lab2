var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;
var mongoURL = "mongodb://localhost:27017/dropbox"
createPool();
var connectionArray=[];
function createPool(){   
    console.log("created pool")
    
       for(var i=500;i>=0;i--){
       MongoClient.connect(mongoURL, function(err, _db){
      if (err) { throw new Error('Could not connect: '+err); }
           connectionArray.push(_db);
            console.log(connectionArray.length);
    console.log("connectionArray length");
      //db = _db;
      /*connected = true;
      console.log(connected +" is connected?");
      callback(db);*/
    }); 
    }
       
       
    
    
};

exports.release = function(db){
    console.log("No of connections before release:" + connectionArray.length);
     console.log("releasing a connection to pool")
    connectionArray.push(db);
    console.log("No of connections after release:" + connectionArray.length);
};

exports.connectPool = function(url, callback){   
    console.log(connectionArray.length);
        if(connectionArray.length != 0){
             console.log("using a connection from pool");
            var db1= connectionArray.pop();
            console.log(db1);
            callback(db1);
        }
    else{
         callback("No connection available");
    }
     
};
/**
 * Connects to the MongoDB Database with the provided URL
 */
exports.connect = function(url, callback){
    MongoClient.connect(url, function(err, _db){
      if (err) { throw new Error('Could not connect: '+err); }
      db = _db;
      connected = true;
      console.log(connected +" is connected?");
      callback(db);
    });
};

/**
 * Returns the collection on the selected database
 */
exports.collection = function(name){
    if (!connected) {
      throw new Error('Must connect to Mongo before calling "collection"');
    } 
    return db.collection(name);
  
};