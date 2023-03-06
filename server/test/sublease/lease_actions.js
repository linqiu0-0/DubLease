var assert = require('assert');

const actions = require('../../sublease/lease_actions');

describe('lease_actions.js tests', function () {
  const image_keys = ["test_2"];
  const sublease2 = {
    // PostID: -1,
    // image_keys: ["test_2"],
    PropertyName: "test_apart1",
    PropertyCategory: "apartment",
    PropertyAddress: "address 2, WA",
    PropertyPrice: 1500,
    RoomSize: 1000,
    RoomType: "2B2B",
    GenderLimit: 1,
    IsPetFriendly: 0,
    SubleasePeriodStart: "2020-11-11",
    SubleasePeriodEnd: "2021-1-1",
    PropertyDescription: "test sublease 2",
    ParkingAvailable: 1,
    Deposit: 0,
    Latitude: 0,
    Longitude: 0,
    status: 1,
    UserID: 1,
  };
  const sublease3 = {PropertyName: "test_apart2", UserID: 1,};
  describe('#add_lease', function () {
    it('add one fully-defined sublease should success (code 200)', async function () {
      const res = await actions.add_lease(sublease2.UserID, undefined, sublease2.PropertyAddress,
                                          sublease2.PropertyCategory, sublease2.PropertyName, sublease2.RoomSize, sublease2.RoomType,
                                          sublease2.PropertyPrice, sublease2.Deposit, sublease2.PropertyDescription, sublease2.SubleasePeriodStart,
                                          sublease2.SubleasePeriodEnd, sublease2.GenderLimit, sublease2.IsPetFriendly, sublease2.ParkingAvailable,
                                          sublease2.Longitude, sublease2.Latitude, sublease2.status);
      sublease2.PostID = res.msg.lease_id;
      assert.equal(res.code, 200);
      assert.ok(res.msg.lease_id);
      console.log("POST2 ID: " + sublease2.PostID);
    });
    it('add default-value sublease should also success (code 200)', async function () {
      const res = await actions.add_lease(sublease3.UserID, undefined);
      sublease3.PostID = res.msg.lease_id;
      assert.equal(res.code, 200);
      assert.ok(res.msg.lease_id);
      console.log("POST3 ID: " + sublease3.PostID);
    });
    it('non-exist user id should fail (code 400)', async function () {
      const res = await actions.add_lease(-1, undefined);
      assert.equal(res.code, 400);
      assert.equal(res.msg, "User does not exist");
    });
  });


  describe('#get_lease', function () {
    it('existing sublease id should return code 200 and the correct info', async function () {
      var res = await actions.get_lease(sublease2.PostID);
      assert.equal(res.code, 200);
      assert.equal(res.msg.post_id, sublease2.PostID);
      assert.equal(res.msg.image_keys.length, 0);
      assert.equal(res.msg.name, sublease2.PropertyName);
      assert.equal(res.msg.description, sublease2.PropertyDescription);
      assert.equal(res.msg.address, sublease2.PropertyAddress);
      assert.equal(res.msg.longitude, sublease2.Longitude);
      assert.equal(res.msg.latitude, sublease2.Latitude);
      // TODO: get the user id from database.js and use as the user id here
    });
    it('non-existing sublease id should return code 400', async function () {
      const res = await actions.get_lease(-1);
      assert.equal(res.code, 400);
      assert.equal(res.msg, "Provided lease id does not exist");
    });
  });

  describe('#archive_lease', function () {
    it('existing sublease should successfully archive/unarchive (code 200)', async function () {
      var res = await actions.archive_lease(sublease2.PostID, 0);
      assert.equal(res.code, 200);
      assert.equal(res.msg, "Lease archived");
      res = await actions.archive_lease(sublease2.PostID, 1);
      assert.equal(res.code, 200);
      assert.equal(res.msg, "Lease restored");
    });
    it('non-existing sublease should fail (code 400)', async function () {
      const res = await actions.archive_lease(-1);
      assert.equal(res.code, 400);
      assert.equal(res.msg, "Provided lease id does not exist");
    });
  });

  var new_post_id;
  describe('#edit_lease', function () {
    // lease_id, user_id, images, images_deleted, address, category, property_name, area, room_type, price, deposit,
    // description, start_date, end_date, gender, pet, parking, longitude, latitude, status=1
    it('existing sublease should successfully edit all fields (code 200)', async function () {
      // essentially changing all fields of post 3 to post 2 (besides post id)
      var res = await actions.edit_lease(sublease3.PostID, sublease2.UserID, undefined ,undefined, sublease2.PropertyAddress,
        sublease2.PropertyCategory, sublease2.PropertyName, sublease2.RoomSize, sublease2.RoomType,
        sublease2.PropertyPrice, sublease2.Deposit, sublease2.PropertyDescription, sublease2.SubleasePeriodStart,
        sublease2.SubleasePeriodEnd, sublease2.GenderLimit, sublease2.IsPetFriendly, sublease2.ParkingAvailable,
        sublease2.Longitude, sublease2.Latitude, sublease2.status);
      assert.equal(res.code, 200);
      new_post_id = res.msg.lease_id;
      const db = require('../../data/database.js');
      var res = await db.get_lease_by_id(new_post_id);
      var sublease = JSON.parse(JSON.stringify(res));
      sublease.PostID = sublease2.PostID;
      assert.deepEqual(sublease, sublease2);
    });
    it('non-existing sublease should fail (Not implemented)', async function () {
    });
  });

  describe('#delete_lease', function () {
    it('existing sublease should successfully be deleted (code 200)', async function () {
      var res = await actions.delete_lease(new_post_id);
      assert.equal(res.code, 200);
      assert.equal(res.msg, "Success");
    });
    it('already-deleted sublease should fail (code 400)', async function () {
      var res = await actions.delete_lease(new_post_id);
      assert.equal(res.code, 400);
      assert.equal(res.msg, "Provided lease id does not exist");
    });
  });
});