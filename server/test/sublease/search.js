var assert = require('assert');

const db = require('../data/database');  // must run after the database is done inserting

const search = require('../../sublease/search')
describe('search.js', function () {
  const sublease = db.sublease1;
  // describe('#search_sublease', function () {
  //   it('full valid parameters should return 200 (msg tested in database and integration)', async function () {
  //     const res = await search.search_sublease(sublease.name, "2020-10-11", "2020-12-11", 1000, 2000, 1, 0);
  //     assert.equal(res.code, 200);
  //     assert.ok(res.msg.length > 0);
  //   });
  //   it('no parameters should also return 200 (msg tested in database and integration)', async function () {
  //     const res = await search.search_sublease(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  //     assert.equal(res.code, 200);
  //     assert.ok(res.msg.length > 0);
  //   });
  // });

  // describe('#list_sublease', function () {
  //   it('valid user id should return 200 (msg tested in database and integration)', async function () {
  //     const res = await search.list_sublease(sublease.user_id);
  //     assert.equal(res.code, 200);
  //     assert.ok(res.msg.length > 0);
  //   });
  //   it('invalid user id should return 400', async function () {
  //     const res = await search.list_sublease(-1);
  //     assert.equal(res.code, 400);
  //     assert.equal(res.msg, "User does not exist");
  //   });
  // });
});