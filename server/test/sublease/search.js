var assert = require('assert');

const db = require('../data/database');  // must run after the database is done inserting

const search = require('../../sublease/search');
describe('search.js', function () {
  // should already be in the db
  const sublease = {
    image_keys: ["test_1_1", "test_1_2", "test_1_3"],
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
  };
  describe('#search_sublease', function () {
    it('full valid parameters should return 200 (msg tested in database and integration)', async function () {
      const res = await search.search_sublease(sublease.PropertyName, "2020-10-11", "2020-12-11", 1000, 2000, 4, 0);
      assert.equal(res.code, 200);
      assert.equal(res.msg[0].name, sublease.PropertyName);
      assert.equal(res.msg[0].category, sublease.PropertyCategory);
      assert.equal(res.msg[0].address, sublease.PropertyAddress);
      assert.equal(res.msg[0].price, sublease.PropertyPrice);
      assert.equal(res.msg[0].space, sublease.RoomSize);
      assert.equal(res.msg[0].bedNum, 4);
      assert.equal(res.msg[0].bathNum, 3);
      assert.equal(res.msg[0].gender, sublease.GenderLimit);
      assert.equal(res.msg[0].petOK, sublease.IsPetFriendly);
      assert.equal(res.msg[0].periodStart, sublease.SubleasePeriodStart);
      assert.equal(res.msg[0].periodEnd, sublease.SubleasePeriodEnd);
      assert.equal(res.msg[0].description, sublease.PropertyDescription);
      assert.equal(res.msg[0].parking, sublease.ParkingAvailable);
      assert.equal(res.msg[0].deposit, sublease.Deposit);
      assert.equal(res.msg[0].longitude, sublease.Longitude);
      assert.equal(res.msg[0].latitude, sublease.Latitude);
      assert.equal(res.msg[0].status, sublease.status);
      assert.ok(res.msg[0].post_id);
    });
    it('no parameters should also return 200 (msg tested in database and integration)', async function () {
      const res = await search.search_sublease();
      assert.equal(res.code, 200);
      assert.ok(res.msg.length > 0);
    });
  });

  describe('#list_sublease', function () {
    it('valid user id should return 200 (msg tested in database and integration)', async function () {
      const res = await search.list_sublease(1);  // Good to have: change to test user from test/data/database.js
      assert.equal(res.code, 200);
      assert.ok(res.msg.length > 0);
    });
    it('invalid user id should return 400', async function () {
      const res = await search.list_sublease(-1);
      assert.equal(res.code, 400);
      assert.equal(res.msg, "User does not exist");
    });
  });
});