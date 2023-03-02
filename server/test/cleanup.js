/* 
 * cleans up the database in the end
*/
require('./data/database');
require('./data/file_storage');
require('./sublease/search');
require('./user/account');
const assert = require('assert');

const db = require('../data/database');
describe('Cleanup', function () {
  describe('#Delete all test data from db', function () {
    it('a non-negative number of test users starting with test_ should be removed', async function () {
      var res = await db._delete_test_user();
      console.log("removed " + res + " test users");
      assert.ok(res);
    });
  });
  describe('#Disconnect db', function () {
    it('should success with no error', function () {
      db.disconnect_db();
    });
  });
});