var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;


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


/*var ejs= require('ejs');
var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port
 var pool = mysql.createPool({
    connectionLimit : 10,
     host     : 'localhost',
     user     : 'manasa',
     password : 'manasa',
     database : 'dropboxdb',
     port	 : 3306,
     debug    :  false
 }); 

function fetchData(callback,sqlQuery){
 pool.getConnection(function(err, connection) { 
     // Use the connection 
     connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or results
			callback(err, rows);
		}
         connection.release();
         // the connection has been returned to the pool.
	});
     
 });
}	

exports.fetchData=fetchData;*/