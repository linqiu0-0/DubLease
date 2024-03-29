require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const search = require('./sublease/search');
const account = require('./user/account');
const lease = require('./sublease/lease_actions');
const imageHandler = require('./data/file_storage');
const auth = require('./user/authentication');

const verify_token = auth.verify_token;

const app = express();

app.use(
   bodyParser.urlencoded({
     extended: true,
     limit: '50mb',
     parameterLimit: 50000,
   })
);
app.use(bodyParser.json({limit: '50mb'}));

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
app.get('/profile', verify_token, async(req, res) => {
   // const userid = req.query.id;
   const userid = req.user.userid;
   if (!userid) {
      res.status(400).send("user id is required");
      return;
   }

   if (userid != req.query.id) {
      res.status(401).send("Unauthorized user");
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
       return;
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

 app.get('/list', verify_token, async(req, res) => {
   const userid = req.user.userid;
   // const userid = req.query.id;
   if (!userid) {
      res.status(400).send("user id is required");
      return;
   }

   if (userid != req.query.id) {
      res.status(401).send("Unauthorized user");
      return;
   }

   try {
      const {code, msg} = await search.list_sublease(userid);
      res.status(code).send(msg);
   } catch (e) {
      console.log(e);
      res.status(500).send(new Error("internal server error"));
   }
 });


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

app.post('/edit_profile', verify_token, async (req, res) => {
   // var user_id = req.body.id;
   var user_id = req.user.userid;
   var username = req.body.username;
   var email = req.body.email;
   var phone = req.body.phone;

   if (!user_id) {
      res.status(400).send("user id is required");
      return;
   }

   if (user_id != req.body.id) {
      res.status(401).send("Unauthorized user");
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
});


// leasing module
app.post('/add_lease', verify_token, async (req, res) => {
   // const user_id = req.body.user_id;
   const user_id = req.user.userid;
   const address = req.body.address;
   const category = req.body.category;
   const property_name = req.body.propertyName;
   const area = req.body.area;
   const room_type = req.body.roomType;
   const price = req.body.price;
   const deposit = req.body.deposit;
   const description = req.body.description;
   const start_date = req.body.dateAvailable;
   const end_date = req.body.dateEnd;
   const gender = req.body.gender;
   const pet = req.body.pet;
   const parking = req.body.parking;
   const longitude = req.body.longitude;
   const latitude = req.body.latitude;
   const images = req.body.images;
   
   if (!user_id) {
      res.status(400).send("user id is required");
      return;
   }

   if (user_id != req.body.user_id) {
      res.status(401).send("Unauthorized user");
      return;
   }

   try {
      const {code, msg} = await lease.add_lease(user_id, images, address, category, property_name, area, room_type, price, deposit, 
                                                description, start_date, end_date, gender, pet, parking, longitude, latitude);
      res.status(code).send(msg);
   } catch (e) {
      console.log(e);
      res.status(500).send(new Error("internal server error"));
   }
});

app.post('/edit_lease', verify_token, async(req, res) => {
   const lease_id = req.body.lease_id;
   // const user_id = req.user.userid;
   const user_id = req.body.user_id;
   const address = req.body.address;
   const category = req.body.category;
   const property_name = req.body.propertyName;
   const area = req.body.area;
   const room_type = req.body.roomType;
   const price = req.body.price;
   const deposit = req.body.deposit;
   const description = req.body.description;
   const start_date = req.body.dateAvailable;
   const end_date = req.body.dateEnd;
   const gender = req.body.gender;
   const pet = req.body.pet;
   const parking = req.body.parking;
   const longitude = req.body.longitude;
   const latitude = req.body.latitude;
   const images = req.body.images;
   const images_deleted = req.body.imagesDeleted;

   if (!lease_id) {
      res.status(400).send("lease id is required");
      return;
   }

   if (user_id != req.user.userid) {
      res.status(401).send("Unauthorized user");
      return;
   }

   try {
      const {code, msg} = await lease.edit_lease(lease_id, user_id, images, images_deleted, address, category, property_name, area, room_type, price, deposit, description, start_date, end_date, gender, pet, parking, longitude, latitude);
      res.status(code).send(msg);
   } catch (e) {
      console.log(e);
      res.status(500).send(new Error("internal server error"));
   }
});

// uploads an image to the file storage system; **DOESN'T** store any lease or user information related to the image
app.post('/upload_image', async(req, res) => {
   const name = req.body.name;
   const data = req.body.data;
   const type = req.body.type;
   const encoding = req.body.encoding;

   if (!name || !data) {
      res.status(400).send("image's name and data must not be empty")
      return;
   }

   try {
      location = await imageHandler.uploadObject(name, data, type, encoding);
      if (location) {
         res.status(200).send({
            location: location,
         });
      } else {
         res.status(500).send(new Error("internal server error"));
      }
   } catch (e) {
      console.log(e);
      res.status(500).send(new Error("internal server error"));
   }
});

app.post('/delete_image', async(req, res) => {
   const key = req.body.key;

   if (!key) {
      res.status(400).send("the image key must not be empty");
      return;
   }

   try {
      const msg = await imageHandler.deleteObject(key);
      res.status(200).send(msg);
   } catch (e) {
      console.log(e);
      res.status(500).send(new Error("internal server error"));
   }
});

app.post('/batch_delete_images', async(req, res) => {
   const keys = req.body.keys;

   if (!keys) {
      res.status(400).send("the image keys cannot be empty");
      return;
   }

   try {
      const results = await imageHandler.batchDeleteObjects(keys);
      res.status(200).send(results);
   } catch (e) {
      console.log(e);
      res.status(500).send(new Error("internal server error"));
   }
});

app.post('/archive_lease', verify_token, async(req, res) => {
   const lease_id = req.body.lease_id;
   const user_id = req.user.userid;
   const status = req.body.status;
   if (!lease_id) {
      res.status(400).send("lease id is required")
      return;
   }

   try {
      const {code, msg} = await lease.archive_lease(lease_id, user_id, status);
      res.status(code).send(msg);
   } catch (e) {
      console.log(e);
      res.status(500).send(new Error("internal server error"));
   }
});

app.post('/delete_lease', verify_token, async(req, res) => {
   const lease_id = req.body.lease_id;
   const user_id = req.user.userid;
   if (!lease_id) {
      res.status(400).send("lease id is required")
      return;
   }

   try {
      const {code, msg} = await lease.delete_lease(lease_id, user_id);
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