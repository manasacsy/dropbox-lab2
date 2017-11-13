var glob = require('glob');
var fileActions = require('./fileActions');
var bcrypt = require('bcrypt');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var passport = require('passport');
var kafka = require('./kafka/client');

function signUpAction(req,res)
{ 
   /* var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password.toString(), salt);
 var status;
 var data;
    mongo.connect(mongoURL, function(){
        
                var coll = mongo.collection('user');
                coll.insertOne(myobj, function(err, mongores) {
    if (err){
        	res.status(401).json({data: err});
        status = 401;
        data = err
    }
                    else{
                        console.log("1 document inserted"  + res);
                        console.log(mongores)
                       res.status(200).json({data: mongores.ops});
                    }
    
  });
            });*/
    var myobj = {
            "userid" : req.body.username,
            "password" : req.body.password,
            "firstname" : req.body.firstname,
            "lastname" : req.body.lastname,
            "data" : [],
            "useractivities" :[]
        }
    kafka.make_request('signup_topic',{"data":myobj}, function(err,results){
            console.log('in result');
            console.log(results);
        if (err){
        	res.status(401).json({data: err});
    }
                    else{
                       res.status(200).json({data: results});
                    }
            
        });
}

exports.signUpAction = signUpAction;