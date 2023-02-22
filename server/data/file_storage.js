const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const bucket = 'dubleaseimages';


// var bucketParams = {
//     Bucket : 'dubleaseimages',
// };

var objectParams = {
  Bucket : 'dubleaseimages',
  Key: 'logo192.png',
};

exports.getObject = async function(key) {
  const objectParams = {
    Bucket : bucket,
    Key : key,
  }
  try {
    const results = await s3.getObject(objectParams).promise();
    return results;
  } catch (err) {
    console.error(err);
  }
}

exports.uploadObject = async function(key, body, type='image/png') {
  const params = {
    Bucket : bucket,
    Key : key,
    Body : body,
    ContentType : type,
  }
  try {
    const results = await s3.upload(params).promise();
    return results.Location;
  } catch (err) {
    console.error(err)
  }
}


// s3.listObjects(bucketParams, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data);
//   }
// });


// s3.getObject(objectParams, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data);
//   }
// });

// var request = await s3.getObject(objectParams).promise();
// // obj = await request.promise();
// console.log(request);

const run = async () => {
  try {
    const results = await s3.getObject(objectParams).promise();
    console.log(results.Body);
  } catch (err) {
    console.error(err);
  }
}

run();