var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var s3 = new AWS.S3({apiVersion: '2006-03-01'});


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