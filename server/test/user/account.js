var assert = require('assert');

const db = require('../data/database');  // must run after the database is done inserting

const account = require('../../user/account')
describe('account.js', function () {
  const user4 = db.user4;
  const user5 = db.user5;
  describe('#signup', function () {
    it('valid user info should successfully signup', async function () {
      const res = await account.signup(user4.email, user4.password_hash, user4.username);
      user4.userID = res.msg.userid;
      assert.equal(res.code, 200);
      assert.equal(res.msg.username, user4.username);
      assert.ok(res.msg.userid);
    });
    it('repeated user info should return 400)', async function () {
      const res = await account.signup(user4.email, user4.password_hash, user4.username);
      assert.equal(res.code, 400);
      assert.equal(res.msg, "Email already exists");
    });
  });

  describe('#verify_login', function () {
    it('valid user info should successfully login', async function () {
      const res = await account.verify_login(user4.email, user4.password_hash);
      assert.equal(res.code, 200);
      assert.equal(res.msg.username, user4.username);
      assert.equal(res.msg.userid, user4.userID);
    });
    it('non-exist user email should return 400', async function () {
      const res = await account.verify_login(user5.email, user5.password_hash);
      assert.equal(res.code, 400);
      assert.equal(res.msg, "Email does not exist");
    });
    it('incorrect user password should return 400', async function () {
      const res = await account.verify_login(user4.email, "-1");
      assert.equal(res.code, 400);
      assert.equal(res.msg, "Incorrect Password");
    });
  });

  describe('#get_user_profile', function () {
    it('valid user id should success', async function () {
      const res = await account.get_user_profile(user4.userID);
      assert.equal(res.code, 200);
      assert.equal(res.msg.username, user4.username);
      assert.equal(res.msg.email, user4.email);
    });
    it('repeated user info should return 400)', async function () {
      const res = await account.get_user_profile(-1);
      assert.equal(res.code, 400);
      assert.equal(res.msg, "User does not exist");
    });
  });

  describe('#edit_profile', function () {
    it('should be able to change username', async function () {
      console.log("HELLO " + user4.userID);
      const res = await account.edit_profile(user4.userID, user4.username + "_", undefined, undefined);
      assert.equal(res.code, 200);
    });
    it('should be able to change email', async function () {
      const res = await account.edit_profile(user4.userID, undefined, user4.email + "_", undefined);
      assert.equal(res.code, 200);
    });
    it('should be able to change phone', async function () {
      const res = await account.edit_profile(user4.userID, undefined, undefined, "test_phone");
      assert.equal(res.code, 200);
    });
    it('db showing the updated user info', async function () {
      const res = await account.get_user_profile(user4.userID);
      assert.equal(res.code, 200);
      assert.equal(res.msg.username, user4.username + "_");
      assert.equal(res.msg.email, user4.email + "_");
      assert.equal(res.msg.phone, "test_phone");
    });
    it('incorrect user id should return 400', async function () {
      const res = await account.edit_profile(-1, undefined, undefined, undefined);
      assert.equal(res.code, 400);
      assert.equal(res.msg, "User does not exist");
    });
  });
});