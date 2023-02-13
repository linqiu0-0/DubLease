const account = require('./user/account');
const express = require('express');
const bodyParser = require('body-parser');
const search = require('./user/search');
const cors = require('cors');
const app = express();

app.use(
   bodyParser.urlencoded({
     extended: false,
   })
 );
app.use(bodyParser.json());

app.use(
   cors({
       origin: ['http://localhost:8080'],
       methods: ['POST', 'GET'],
   })
);

app.get('/', function (req, res) {
   res.send('Hello World');
});


/*_________________________End Points__________________________ */

// Sign-in Module
app.post('/signup', async (req, res) => {
   var email = req.body.email;
   var password = req.body.password;
   var username = req.body.username;

   if (!email || !password || !username) {
      res.status(400).send("invalid user parameters");
      return;
   }

   try {
      const {code, msg} = await account.signup(email, password, username);
      res.status(code).send(msg);
   } catch (e) {
      console.log(e);
      res.status(500).send(new Error("internal server error"));
   }
});

app.post('/login', async (req, res) => {
   var email = req.body.email;
   var password = req.body.password;
   if (!email || !password) {
      res.status(400).send("invalid user parameters");
      return;
   }

   try {
      const {code, msg} = await account.verify_login(email, password);
      res.status(code).send(msg);
   } catch (e) {
      console.log(e);
      res.status(500).send(new Error("internal server error"));
   }
});

// Main page: search filtering
app.get('/home', async (req, res) => {
  var name = req.query.name;
  var start_date = req.query["start-date"];
  var end_date = req.query["end-date"];
  var min_price = req.query["min-price"];
  var max_price = req.query["max-price"];
  var bed = req.query.bed;
  var gender = req.query.gender;
  console.log(name + ", " + start_date + ", " + end_date + ", " + min_price + ", " + max_price + ", " + bed + ", " + gender);

  // if (!name && !start_date && !end_date && !min_price && !max_price
  //     && !bed && !gender) {
  //    res.status(400).send("need to specify at least one condition");
  //    return;
  // }

  try {
     const {code, msg} = await search.search_sublease(name, start_date, end_date, min_price, max_price, bed, gender);
     res.status(code).send(msg);
  } catch (e) {
     console.log(e);
     res.status(500).send(new Error("internal server error"));
  }
});


var server = app.listen(8000, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("App listening at port %s", port);
});