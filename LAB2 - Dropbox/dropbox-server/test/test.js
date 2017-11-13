
var Mocha = require("mocha");
var http=require("http");
var request=require("request");
var mocha = new Mocha({
    ui: "bdd",
    reporter: "spec"
});
//const describe= require('mocha').describe;
// Create a new test suite for our Bank Account
const assert = require('assert');

describe('Get User Activity', function(){it(
    'check if user activity data is being fetched',
    function(done){http.get('http://localhost:3005/getuseractivity/test3@gmail.com', function(res) {assert.equal(201,res.statusCode);done();})});});

describe('Get Folder Data', function(){it(
    'check if folder data is being fetched',
    function(done){http.get('http://localhost:3005/getFolderData/59f986fc8b236b2af4640303/test3@gmail.com', function(res) {assert.equal(201,res.statusCode);done();})});});

describe('Get user groups', function(){it(
    'check if user create folder is working',
    function(done){http.get('http://localhost:3005/getgroups/test3@gmail.com', function(res) {assert.equal(200,res.statusCode);done();})});});



describe('Get Files', function(){it(
    'fetch files',
    function(done){http.get('http://localhost:3005/files/test3@gmail.com', function(res) {assert.equal(200,res.statusCode);done();})});});


describe('user information', function(){it(
    'user information',
    function(done){http.get('http://localhost:3005/getuseractivity/test3@gmail.com', function(res) {assert.equal(201,res.statusCode);done();})});});
describe('Get User Activity', function(){it(
    'check if user activity data is being fetched',
    function(done){http.get('http://localhost:3005/getuseractivity/test3@gmail.com', function(res) {assert.equal(201,res.statusCode);done();})});});

describe('Get Folder Data', function(){it(
    'check if folder data is being fetched',
    function(done){http.get('http://localhost:3005/getFolderData/59f986fc8b236b2af4640303/test3@gmail.com', function(res) {assert.equal(201,res.statusCode);done();})});});

describe('Get user groups', function(){it(
    'check if user create folder is working',
    function(done){http.get('http://localhost:3005/getgroups/test3@gmail.com', function(res) {assert.equal(200,res.statusCode);done();})});});



describe('Get Files', function(){it(
    'fetch files',
    function(done){http.get('http://localhost:3005/files/test3@gmail.com', function(res) {assert.equal(200,res.statusCode);done();})});});


describe('user information', function(){it(
    'user information',
    function(done){http.get('http://localhost:3005/getuseractivity/test3@gmail.com', function(res) {assert.equal(201,res.statusCode);done();})});});