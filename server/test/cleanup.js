/* 
 * cleans up the database in the end
*/
const db_test = require('./data/database');
require('./data/file_storage');
require('./sublease/search');
require('./sublease/lease_actions');
require('./user/account');
const assert = require('assert');

const db = require('../data/database');
describe('Cleanup', function () {
  describe('#Delete all test data from db', async function () {
    it('a non-negative number of test users starting with test_ should be removed', async function () {
      var res = await db._delete_test_user();
      console.log("removed " + res + " test users");
      assert.ok(res);
    });

    it('a non-negative number of test images associated with test subleases should be removed', async function () {
      var res = await db._delete_test_images();
      console.log("removed " + res + " test images");
      assert.ok(res);
    });

    it('a non-negative number of test subleases starting with test_ should be removed', async function () {
      // var res = await db.delete_lease(sublease1_PostID);
      var res  = await db._delete_test_sublease();
      console.log("removed " + res + " test subleases");
      assert.ok(res);
    });
  });
  describe('#Disconnect db', function () {
    it('should success with no error', function () {
      db.disconnect_db();
    });
  });
});