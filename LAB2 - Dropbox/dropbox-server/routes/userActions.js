//var mysql = require('./mysql');

var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var mongo1 = require('mongodb');

function userInformation(req,res){  
   /* var userInforQuery  =  "select * from users where userid=" + req.params.userid;
    mysql.fetchData(function(err,results){
        console.log(results)
		if(err){
			res.status(401).json(err);
		}
		else 
		{
         res.status(200).json(results);   
		}  
	}, userInforQuery);*/
     mongo.connect(mongoURL, function(){
                var coll = mongo.collection('user');
                coll.findOne({userid: req.params.userid},function(err, docs){
                    if (docs) {
                        
                       res.status(201).json({mongores: docs});
                        

                    } else {
                       res.status(401).json({mongores: err});
                    }
                });
            });
}
function setuserInformation(req,res){
    console.log("req.body");
    console.log(req.body);
     mongo.connect(mongoURL, function(){
                var coll = mongo.collection('user');
         var o_id = new mongo1.ObjectID(req.body._id);
         req.body._id = o_id;
                coll.update({userid: req.body.userid},req.body,{ upsert: true },function(err, docs){
                    if (docs) {
                        
                       res.status(201).json({mongores: docs});
                        

                    } else {
                       res.status(401).json({mongores: err});
                    }
                });
            });
}
exports.setuserInformation = setuserInformation;
exports.userInformation = userInformation;