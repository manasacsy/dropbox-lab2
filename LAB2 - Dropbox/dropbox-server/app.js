var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var login = require('./routes/login');
var fileActions = require('./routes/fileActions');
var userActions = require('./routes/userActions');
    var passport = require('passport');
require('./routes/passport')(passport);
var multer  =   require('multer');
var app = express();
var cors = require('cors');

var router = express.Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        console.log("request in multer" + req);
        cb(null, file.originalname)
    }
});

var upload = multer({storage:storage});
var mongoSessionURL = "mongodb://localhost:27017/dropboxsessions";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/dropbox";

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(passport.initialize());
// all environments
app.set('port', process.env.PORT || 3005);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.bodyParser());
app.use(cookieParser());

// development only
/*if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}*/
app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));
app.post('/loginAction', 
        function loginAction(req,res)
{
     passport.authenticate('login', function(err, user) {
        if(err) {
            res.status(500).json({mongores:"err"});
        }
        if(!user) {
            res.status(401).json({mongores:"err"});
        }
        else{
            req.session.user = user.data.username;
        console.log(req.session.user);
        console.log("session initilized");
        return res.status(200).json({mongores:user});
        }
       
    })(req, res);
});
app.post('/signUp', login.signUpAction);
app.post('/files/upload/:currentFolder/:userid', upload.single('mypic'),  fileActions.upload);


app.post('/uploadFileGroup/:groupid/:userid', upload.single('mypic'),  fileActions.uploadFileGroup);
app.get('/files/:userid', fileActions.getData);
app.post('/createFolder/:name/:inFolder/:userid',fileActions.createFolder);
app.post('/starFile/:userid',fileActions.starFile);
app.get('/getFolderData/:folderid/:userid',fileActions.getFolderData);
app.post('/share/:userid/:restype',fileActions.shareAction);
app.post('/creategroup/:userid/:groupname',fileActions.creategroup);
app.get('/getgroups/:userid',fileActions.getgroups);
app.get('/userInformation/:userid',userActions.userInformation);
app.post('/setuserInformation/:userid',userActions.setuserInformation);
app.get('/getuseractivity/:userid',fileActions.getuseractivity);
/*



app.post('/delete/:userfileid/:userid/:type/:fileid/:filename',fileActions.deleteAction);

*/
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
