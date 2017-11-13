var glob = require('glob');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var mongo1 = require('mongodb');
var kafka = require('./kafka/client');

function getData(req,res){
    getFiles(req.params.userid,res,null);
}
function upload(req,res){
   // setuseractivity(req.params.userid,"A file was uploaded")
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    dt.format('m/d/Y H:M:S');
     mongo.connect(mongoURL, function(){
        var myobj = {
            "fileid" : 1,
            "filename" : req.file.originalname,
            "filetype" : 0,
            "owner" : true,
            "star" : false,
            "activityIndicator" : true
        }
        var myquery;
        var newvalues = { $push: { data: myobj } };
                var coll = mongo.collection('user');
         
         if(req.params.currentFolder === 'null'){
                var coll = mongo.collection('user');
                                 myquery = { userid: req.params.userid };
                            }
                            else{
                    var coll = mongo.collection('folders'); 
                                 o_id = new mongo1.ObjectID(req.params.currentFolder);
                                 myquery = { _id: o_id};
                            }
         
                coll.updateOne(myquery, newvalues, function(err, mongores) {
    if (err){
        	res.status(401).json({data: err});
    }
                    else{                     
                        getFiles(req.params.userid,res,req.params.currentFolder);
                    }
  });
            });
}

function uploadFileGroup(req,res){
   // setuseractivity(req.params.userid,"A file was uploaded")
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    dt.format('m/d/Y H:M:S');
     mongo.connect(mongoURL, function(){
        var myobj = {
            "fileid" : 1,
            "filename" : req.file.originalname,
            "filetype" : 0,
            "owner" : req.params.userid,
            "star" : false,
            "activityIndicator" : true
        }
        var myquery;
        var newvalues = { $push: { data: myobj } };
                var coll = mongo.collection('groups');
        // console.log("dsfd" + groupid)
         console.log(req.params.currentFolder)
         if(req.params.currentFolder === 'null' || req.params.currentFolder === null || req.params.currentFolder === undefined ||
           req.params.currentFolder === 'undefined' ){
             console.log("createing in group")
                var coll = mongo.collection('groups');
              o_id = new mongo1.ObjectID(req.params.groupid);
                                 myquery = { _id: o_id };
                            }
                            else{
                    var coll = mongo.collection('folders'); 
                                 o_id = new mongo1.ObjectID(req.params.currentFolder);
                                 myquery = { _id: o_id};
                            }
         
                coll.updateOne(myquery, newvalues, function(err, mongores) {
    if (err){
        	res.status(401).json({data: err});
    }
                    else{                     
                        getFiles(req.params.userid,res,req.params.currentFolder);
                    }
  });
            });
}

function getFiles(userid,res,currentFolder){
    var myobj = {
        "currentFolder":currentFolder,
        "userid":userid
    }
    console.log("sending message: getfiles_topic")
    kafka.make_request('getfiles_topic',{"data":myobj}, function(err,results){
        if (err){
        	res.status(401).json({data: err});
    }
                    else{
                       res.status(200).json({data: results});
                    }
            
        });
    
}
function starFile(req,res){
     var myobj = {
        "userid":req.params.userid,
        "data":req.body.data
    }
    kafka.make_request('starfile_topic',{"data":myobj}, function(err,results){
        if (err){
        	res.status(401).json({data: err});
    }
                    else{
                       res.status(200).json({data: results});
                    }
            
        });
}
function createFolder(req,res){
     var myobj = {
       "name":req.params.name,
       "inFolder":req.params.inFolder,
        "userid":req.params.userid
    }
    kafka.make_request('createfolder_topic',{"data":myobj}, function(err,results){
        if (err){
        	res.status(401).json({data: err});
    }
                    else{
                       res.status(200).json({data: results});
                    }
            
        });
    setuseractivity(req.params.userid,"A folder was created");
}
function shareAction(req,res){    
    var resSharedTo = req.params.userid;
    var restype = req.params.restype;
    var userid = req.params.userid;
    var currentFolder = req.params.currentFolder;
    var tempdata = req.body;
    var folderid = null;
    var filename = null;
    if(restype === 'file'){
        tempdata.owner = false;
        tempdata.star = false;
    }else{
         tempdata.owner = false;
        tempdata.star = false;
        tempdata.copyOf = req.body.folderid;
        folderid = req.body.folderid;
        filename = req.body.filename;
    }
    var myobj = {
        "resSharedTo":resSharedTo,
        "restype" : restype,
        "userid" :userid,
        "currentFolder":currentFolder,
        "tempdata" : tempdata,
        "folderid" :folderid,
        "filename" :filename
    }
     kafka.make_request('share_topic',{"data":myobj}, function(err,results){
        if (err){
        	res.status(401).json({data: err});
    }
                    else{
                       res.status(200).json({data: results});
                    }
            
        });
}
function deleteAction(req,res){
    /*
   var userfileid = req.params.userfileid;
   var userid = req.params.userid;
   var type = req.params.type;
    var fileidtemp = req.params.fileid;
    var deleteQuery;
    var validDelete;
    if(userfileid !== null){
       console.log("hvhj" + userfileid)
    var validDeleteQyery;
    validDeleteQyery = "SELECT * FROM `user_files` where user_files.userfileid =" + userfileid;
    
    mysql.fetchData(function(err,results){
                    if(err) {
			res.status(401).json({data: err});
		}   
           }
           res.status(200).json(obj);
        validDelete = results[0].owner;
        var fileid = results[0].fileid;
        var folderid = results[0].folderid;
        if(validDelete === 'true' && type === 'file'){
            
            
             var dateTime = require('node-datetime');
    var dt = dateTime.create();
    dt.format('m/d/Y H:M:S');

    var activityQuery = "INSERT INTO `dropboxdb`.`user_activity` (`userid`, `event`, `eventtime`) VALUES("+req.params.userid
    +",'Deleted the file "+ req.params.filename
    +"','"
    +new Date(dt.now())
    +"')";
    console.log(activityQuery)
                  mysql.fetchData(function(err,results){
               },activityQuery);
            
            
            
            deleteQuery = "DELETE FROM `dropboxdb`.`user_files` WHERE user_files.fileid = "+fileid;  
             mysql.fetchData(function(err,results){
                    if(err) {
			res.status(401).json({data: err});
		}   
                  
                   var deletefilesQuery = "DELETE FROM `dropboxdb`.`files` WHERE files.fileid = "+fileid;
                  mysql.fetchData(function(err,results){
                    if(err) {
			res.status(401).json({data: err});
		}   
                   var obj={
               "data" : results
           }
           res.status(200).json(obj);
               },deletefilesQuery);
               },deleteQuery);
        }
        else if(validDelete === 'true' && type === 'folder'){
            
            
            
            
              var dateTime = require('node-datetime');
    var dt = dateTime.create();
    dt.format('m/d/Y H:M:S');

    var activityQuery = "INSERT INTO `dropboxdb`.`user_activity` (`userid`, `event`, `eventtime`) VALUES("+req.params.userid
    +",'Deleted the folder "+ req.params.filename
    +"','"
    +new Date(dt.now())
    +"')";
    console.log(activityQuery)
                  mysql.fetchData(function(err,results){
               },activityQuery);
            
            
            
            deleteQuery = "DELETE FROM `dropboxdb`.`user_files` WHERE user_files.folderid = "+folderid; 
                mysql.fetchData(function(err,results){
                    if(err) {
			res.status(401).json({data: err});
		}   
                   var deletefolderQuery = "DELETE FROM `dropboxdb`.`folders` WHERE folders.folderid = "+folderid;
                  mysql.fetchData(function(err,results){
                    if(err) {
			res.status(401).json({data: err});
		}   
                   var obj={
               "data" : results
           }
           res.status(200).json(obj);
               },deletefolderQuery);
               },deleteQuery);
            }
        else{
            var obj={
                messge:"mot authorized to delete"
            }
            res.status(200).json(obj);
        }
        
               },validDeleteQyery);
       }
    else{
         var deletefilesQuery = "DELETE FROM `dropboxdb`.`files` WHERE files.fileid = "+fileidtemp;
                  mysql.fetchData(function(err,results){
                    if(err) {
			res.status(401).json({data: err});
		}   
                   var obj={
               "data" : results
           }
           res.status(200).json(obj);
               },deletefilesQuery);
    }
*/
}
function  setuseractivity(userid,message){
    var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');
     var myquery = { userid: userid};
    var myobj = {
        "message" : message + " at " + formatted
    }
    var newvalues = { $push: { useractivities: myobj} };
    mongo.connect(mongoURL, function(){
                var coll = mongo.collection('user');
                coll.updateOne(myquery, newvalues,function(err, user){
                   
                });
            });  
    
}
function  getuseractivity(req,res){
    mongo.connect(mongoURL, function(){
                var coll = mongo.collection('user');
                coll.findOne({userid: req.params.userid}, function(err, user){
                  
                    if (user) {
                        
                       res.status(201).json({mongores: user.useractivities});
                        

                    } else {
                       res.status(401).json({mongores: err});
                    }
                });
            });  
    
}

function getFolderData(req,res){
    mongo.connect(mongoURL, function(){
        var o_id = new mongo1.ObjectID(req.params.folderid);
                var coll = mongo.collection('folders');
                coll.findOne({_id: o_id}, function(err, docs){
                    if (docs) {
                        
                       res.status(201).json({mongores: docs.data});
                        

                    } else {
                       res.status(401).json({mongores: err});
                    }
                });
            });
}

function unstarFile(req,res){
    var userfileid = req.params.userfileid;
    var unstartFileQuery="UPDATE `dropboxdb`.`user_files` SET `star` = 'false' WHERE `userfileid` ="+ userfileid;

    mysql.fetchData(function(err,results){
        if(err){
			res.status(401).json({data: err});
		}
		else 
		{
           res.status(200).json(results); 
        }
    },unstartFileQuery);
}
function creategroup(req,res){
    var myobj={
        "groupname" :req.params.groupname,
        "data" :[],
        "members" :[{
            "userid" : req.params.userid
        }]
    }
     kafka.make_request('creategroup_topic',{"data":myobj}, function(err,results){
        if (err){
        	res.status(401).json({data: err});
    }
                    else{
                       res.status(200).json({data: results});
                    }
            
        });
}
function getgroups(req,res){
    console.log("getting groups")
    kafka.make_request('getgroups_topic',{"data":req.params.userid}, function(err,results){
        if (err){
        	res.status(401).json({data: err});
    }
                    else{
                       res.status(200).json({data: results});
                    }
            
        });
}
exports.uploadFileGroup = uploadFileGroup;
exports.getData = getData;
exports.getuseractivity = getuseractivity;
exports.upload = upload;
exports. getFiles =  getFiles;
exports.starFile = starFile;
exports.unstarFile =unstarFile;
exports.createFolder =createFolder;
exports.getFolderData =getFolderData;
exports.shareAction = shareAction;
exports.deleteAction = deleteAction;
exports.creategroup = creategroup;
exports.getgroups = getgroups;