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


describe('database.js: sublease-related tests', function () {
  const sublease1 = {
    post_id: -1,
    image_keys: ["test_1_1", "test_1_2", "test_1_3"],
    name: "test_house1",
    category: "house",
    address: "address 1, WA",
    price: 1000,
    space: 1000,
    bedNum: 3,
    bathNum: 4,
    gender: 0,
    petOK: 1,
    periodStart: "2020-10-10",
    periodEnd: "2020-12-12",
    description: "test sublease 1",
    parking: 1,
    deposit: 0,
    longitude: 0,
    latitude: 0,
    status: 1,
    user_id: user1_id
  };
  const sublease2 = {
    post_id: -1,
    image_keys: ["test_2"],
    name: "test_apart1",
    category: "apartment",
    address: "address 2, WA",
    price: 1500,
    space: 1000,
    bedNum: 2,
    bathNum: 2,
    gender: 1,
    petOK: 0,
    periodStart: "2020-11-11",
    periodEnd: "2021-1-1",
    description: "test sublease 2",
    parking: 1,
    deposit: 0,
    longitude: 0,
    latitude: 0,
    status: 1,
    user_id: user1_id
  }
  describe('#add_sublease', function () {
    it('to be implemented', async function () {
    });
  });

  describe('#filter_sublease', function () {
    it('will be tested under router tests', async function () {
    });
  });

  // describe('#get_sublease_images', function () {
  //   it('existing sublease', async function () {
  //     var img_key = await db.get_sublease_images(sublease1.post_id);
  //     assert.deepEqual(img_key, sublease1.image_keys);
  //     img_key = await db.get_sublease_images(sublease2.post_id);
  //     assert.deepEqual(img_key, sublease2.image_keys);
  //   });
  //   it('non-existing sublease should return nothing', async function () {
  //     const res = await db.get_sublease_images(-1); // should be undefined
  //     assert.ok(!res);
  //   });
  // });
  // describe('#get_lease_by_id', function () {
  //   it('existing sublease', async function () {
  //     var sublease = await db.get_lease_by_id(sublease1.post_id);
  //     assert.deepEqual(sublease, sublease1); // TODO: Change key names
  //     sublease = await db.get_lease_by_id(sublease2.post_id);
  //     assert.deepEqual(sublease, sublease2); // TODO: Change key names
  //   });
  //   it('non-existing sublease should return nothing', async function () {
  //     const res = await db.get_lease_by_id(-1); // should be undefined
  //     assert.ok(!res);
  //   });
  // });
  // describe('#check_lease_exists', function () {
  //   it('existing sublease', async function () {
  //     var res = await db.check_lease_exists(sublease1.post_id);
  //     assert.ok(res > 0);
  //     res = await db.check_lease_exists(sublease2.post_id);
  //     assert.ok(res > 0);
  //   });
  //   it('non-existing sublease should return nothing', async function () {
  //     const res = await db.check_lease_exists(-1); // should be undefined
  //     assert.ok(!res);
  //   });
  // });

  exports.sublease1 = sublease1;
});
