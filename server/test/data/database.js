var assert = require('assert');

const db = require('../../data/database.js');
describe('#connect_to_db', function () {
  it('should success with no error', async function () {
    db.connect_to_db();
  });
});

var user1_id;
describe('database.js: user-related tests', function () {
  const user1 = {username: "test_Ryan",    email: "ryan@uw.edu",    password_hash: "ryanryan",       userID: -1};
  const user2 = {username: "test_Tony",    email: "tony@uw.edu",    password_hash: "tonytony",       userID: -1};
  const user3 = {username: "test_Lin",     email: "lin@uw.edu",     password_hash: "linlin",         userID: -1};
  const user4 = {username: "test_Crystal", email: "crystal@uw.edu", password_hash: "crystalcrystal", userID: -1};
  const user5 = {username: "test_Carlos",  email: "carlos@uw.edu",  password_hash: "carloscarlos",   userID: -1};
  describe('#add_user', function () {
    it('insert one user', async function () {
      user1.userID = await db.add_user(user1.username, user1.email, user1.password_hash);
      user1_id = user1.userID;
      console.log("user1 id: " + user1_id);
      assert.ok(user1.userID > 0);
    });
    it('insert multiple users', async function () {
      user2.userID = await db.add_user(user2.username, user2.email, user2.password_hash);
      assert.ok(user2.userID > 0);
      user3.userID = await db.add_user(user3.username, user3.email, user3.password_hash);
      assert.ok(user3.userID > 0);
    });
  });
  describe('#get_user', function () {
    it('existing users', async function () {
      var user = await db.get_user(user1.email);
      assert.equal(user.username, user1.username);
      assert.equal(user.password_hash, user1.password_hash);
      user = await db.get_user(user3.email);
      assert.equal(user.username, user3.username);
      assert.equal(user.password_hash, user3.password_hash);
    });
    it('non-existing user should return nothing', async function () {
      const res = await db.get_user(user4.email); // should be undefined
      assert.ok(!res);
    });
  });
  describe('#get_user_by_id', function () {
    it('existing users', async function () {
      var user = await db.get_user_by_id(user1.userID);
      assert.equal(user.username, user1.username);
      assert.equal(user.email, user1.email);
      user = await db.get_user_by_id(user2.userID);
      assert.equal(user.username, user2.username);
      assert.equal(user.email, user2.email);
    });
    it('non-existing user should return nothing', async function () {
      const res = await db.get_user_by_id(-1); // should be undefined
      // console.log(res);
      assert.ok(!res);
    });
  });

  describe('#check_email', function () {
    it('existing email', async function () {
      assert.ok((await db.check_email(user1.email)));
    });
    it('non-existing email should return false', async function () {
      assert.ok(!(await db.check_email(user4.email)));
    });
  });
  describe('#check_user_id', function () {
    it('existing user id', async function () {
      assert.ok((await db.check_user_id(user1.userID)));
      assert.ok((await db.check_user_id(user2.userID)));
      assert.ok((await db.check_user_id(user3.userID)));
    });
    it('non-existing user id should return false', async function () {
      assert.ok(!(await db.check_user_id(user4.email)));
    });
  });

  describe('#update_user', function () {
    it('will be tested under router tests', async function () {
    });
  });

  exports.user4 = user4;
  exports.user5 = user5;
});


var sublease1_id;
describe('database.js: sublease-related tests', function () {
  const sublease1 = {
    // PostID: -1,
    // image_keys: ["test_1_1", "test_1_2", "test_1_3"],
    PropertyName: "test_house1",
    PropertyCategory: "house",
    PropertyAddress: "address 1, WA",
    PropertyPrice: 1000,
    RoomSize: 1000,
    RoomType: "4B3B",
    GenderLimit: 0,
    IsPetFriendly: 1,
    SubleasePeriodStart: "2020-10-10",
    SubleasePeriodEnd: "2020-12-12",
    PropertyDescription: "test sublease 1",
    ParkingAvailable: 1,
    Deposit: 0,
    Latitude: 0,
    Longitude: 0,
    status: 1,
    UserID: user1_id,
  };
  describe('#lease_insert', function () {
    it('insert one sublease should success (yield positive post id)', async function () {
      sublease1.UserID = user1_id;
      sublease1.PostID = await db.lease_insert(sublease1);
      console.log("POST1 ID: " + sublease1.PostID);
      sublease1_id = sublease1.PostID;
      assert.ok(sublease1.PostID > 0);
    });
  });

  describe('#filter_sublease', function () {
    it('will be tested under router tests', async function () {
    });
  });

  describe('#get_lease_by_id', function () {
    it('existing sublease id should return the correct info', async function () {
      var res = await db.get_lease_by_id(sublease1.PostID);
      var sublease = JSON.parse(JSON.stringify(res));
      // console.log(sublease);
      assert.deepEqual(sublease, sublease1);
    });
    it('non-existing sublease id should return nothing', async function () {
      const res = await db.get_lease_by_id(-1); // should be undefined
      assert.ok(!res);
    });
  });
  describe('#check_lease_exists', function () {
    it('existing sublease should return truthy result', async function () {
      var res = await db.check_lease_exists(sublease1.PostID);
      console.log("check_lease_exists existing [" + res + "]");
      assert.ok(res);
    });
    it('non-existing sublease should return nothing', async function () {
      const res = await db.check_lease_exists(-1); // should be undefined
      assert.ok(!res);
    });
  });
  describe('#list_sublease_by_user_id', function () {
    it('existing userid with sublease should return corresponding sublease', async function () {
      var sublease = await db.list_sublease_by_user_id(sublease1.UserID);
      assert.deepEqual(sublease[0], sublease1);
    });
    it('non-existing userid should return nothing', async function () {
      const res = await db.list_sublease_by_user_id(-1); // should return empty list
      // console.log("list_sublease_by_user_id non-exist [" + res + "]");
      assert.ok(!res.length);
    });
  });
  describe('#lease_update', function () {
    it('will be tested under router tests', async function () {
    });
  });
  exports.sublease1 = sublease1;
});


describe('database.js: sublease-image-related tests', function () {
  const image_keys = ["test_1_1", "test_1_2", "test_1_3"];
  describe('#add_lease_id_and_image_key', function () {
    it('insert image keys to one sublease should all success (affected rows should > 0)', async function () {
      for (let key of image_keys) {
        var res = await db.add_lease_id_and_image_key(sublease1_id, key);
        assert.ok(res);
      }
    });
  });

  describe('#check_lease_id_and_image_key_exists', function () {
    it('existing sublease id and image id', async function () {
      for (let key of image_keys) {
        var res = await db.check_lease_id_and_image_key_exists(sublease1_id, key);
        assert.ok(res);
      }
    });
    it('non-existing sublease id should return error', async function () {
      const res = await db.check_lease_id_and_image_key_exists(-1, image_keys[0]); // should be error
      assert.ok(!res);
    });
    it('non-existing image id should return error', async function () {
      const res = await db.check_lease_id_and_image_key_exists(sublease1_id, -1); // should be error
      assert.ok(!res);
    });
  });
  describe('#get_sublease_images', function () {
    it('existing sublease should return correct image keys', async function () {
      var img_keys = await db.get_sublease_images(sublease1_id);
      assert.deepEqual(img_keys, image_keys);
    });
    it('non-existing sublease should return error', async function () {
      const res = await db.get_sublease_images(-1); // should return empty list
      assert.ok(!res.length);
    });
  });
});

describe('#database.js: delete tests', function () {
  it('skipped, to be implemented in future', async function () {
  });
});