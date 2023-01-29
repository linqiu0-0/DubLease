var express = require('express');
var mysql = require('mysql');
var connection = mysql.createConnection({
   host     : 'database-dublease.cgiuptojslql.us-west-2.rds.amazonaws.com',
   port     : '3306',
   user     : 'admin',
   password : 'Ryan6666!!',
   database : 'dublease'
 });
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

connection.connect(function(err){
   if(!err) {
       console.log("Database is connected ... ");    
   } else {
       console.log("Error connecting database ... ");   
       console.log(err); 
   }
});