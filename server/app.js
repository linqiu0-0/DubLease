var express = require('express');
var app = express();

var db = require('./data/database');
var account = require('./user/account');

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