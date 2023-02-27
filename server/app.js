const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const search = require('./sublease/search');
const account = require('./user/account');
const lease = require('./sublease/lease_info');
const imageHandler = require('./data/file_storage');

const app = express();

app.use(
   bodyParser.urlencoded({
     extended: false,
   })
);
app.use(bodyParser.json());

app.use(
   cors({
       origin: "*",
       methods: ['POST', 'GET'],
   })
);

app.get('/', function (req, res) {
   res.send('Hello World');
});


/*_________________________End Points__________________________*/

/*________________________Get Requests_________________________*/
// User Profile
app.get('/profile', async(req, res) => {
   const userid = req.query.id;
   if (!userid) {
      res.status(400).send("user id is required");
      return;
   }

   try {
      const {code, msg} = await account.get_user_profile(userid);
      res.status(code).send(msg);
   } catch (e) {
      console.log(e);
      res.status(500).send(new Error("internal server error"));
   }
})

// Main page & lease info
app.get('/home', async (req, res) => {
   var name = req.query.name;
   var start_date = req.query["start-date"];
   var end_date = req.query["end-date"];
   var min_price = req.query["min-price"];
   var max_price = req.query["max-price"];
   var bed = req.query.bed;
   var gender = req.query.gender;
   // console.log(name + ", " + start_date + ", " + end_date + ", " + min_price + ", " + max_price + ", " + bed + ", " + gender);
 
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
 
 app.get('/get_image', async (req, res) => {
    const key = req.query.key;
    if (!key) {
       res.status(400).send("need to specify the image key");
       return;
    }
 
    const data = await imageHandler.getObject(key);
    if (!data) {
       res.status(500).send(new Error("failed to retrieve image"));
    }
    res.status(200).send(data);
 });
 
 app.get('/get_sublease', async(req, res) => {
    const lease_id = req.query.id;
    if (!lease_id) {
       res.status(400).send("need to specify a lease id");
       return;
    }
    try {
       const {code, msg} = await lease.get_lease(lease_id);
       res.status(code).send(msg);
    } catch (e) {
       console.log(e);
       res.status(500).send(new Error("internal server error"));
    }
 });

 app.get('/list', async(req, res) => {
   const userid = req.query.id;
   if (!userid) {
      res.status(400).send("user id is required");
      return;
   }

   try {
      const {code, msg} = await search.list_sublease(userid);
      res.status(code).send(msg);
   } catch (e) {
      console.log(e);
      res.status(500).send(new Error("internal server error"));
   }
 })


/*________________________Post Requests_________________________*/
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

app.post('/edit_profile', async (req, res) => {
   var user_id = req.body.id;
   var username = req.body.username;
   var email = req.body.email;
   var phone = req.body.phone;

   if (!user_id) {
      res.status(400).send("user id is required");
      return;
   }

   if (!username && !email && !phone) {
      res.status(200).send("nothing to change");
      return;
   }

   try {
      const {code, msg} = await account.edit_profile(user_id, username, email, phone);
      res.status(code).send(msg);
   } catch (e) {
      console.log(e);
      res.status(500).send(new Error("internal server error"));
   }
})


var server = app.listen(8000, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("App listening at port %s", port);
});