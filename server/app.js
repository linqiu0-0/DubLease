var express = require('express');
var mysql = require('mysql');
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var connection = mysql.createConnection({
   host     : 'database-dublease.cgiuptojslql.us-west-2.rds.amazonaws.com',
   port     : '3306',
   user     : 'admin',
   password : 'Ryan6666!!',
   database : 'dublease'
});
var app = express();

var db = require('./data/database');
var account = require('./user/account');

var s3 = new AWS.S3({apiVersion: '2006-03-01'});

app.get('/', function (req, res) {
   res.send('Hello World');
});

// Sign-in Module
app.post('/signup', async (req, res) => {
   code, msg = account.signup(req, res);
   res.status(code);
   res.send(msg);
});
app.post('/signin', async (req, res) => {
   code, msg = account.verify_signin(req, res);
   res.status(code);
   res.send(msg);
});


var server = app.listen(8000, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);

   db.database_init();
});

var bucketParams = {
   Bucket : 'dubleaseimages',
 };

s3.listObjects(bucketParams, function(err, data) {
   if (err) {
     console.log("Error", err);
   } else {
     console.log("Success", data);
   }
 });


var objectParams = {
   Bucket : 'dubleaseimages',
   Key: 'logo192.png',
 };

 s3.getObject(objectParams, function(err, data) {
   if (err) {
     console.log("Error", err);
   } else {
     console.log("Success", data);
   }
});

var bucketParams = {
   Bucket : 'dubleaseimages',
 };

s3.listObjects(bucketParams, function(err, data) {
   if (err) {
     console.log("Error", err);
   } else {
     console.log("Success", data);
   }
 });


var objectParams = {
   Bucket : 'dubleaseimages',
   Key: 'logo192.png',
};

s3.getObject(objectParams, function(err, data) {
   if (err) {
     console.log("Error", err);
   } else {
     console.log("Success", data);
   }
});