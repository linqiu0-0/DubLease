var assert = require('assert');
describe('Array', function () {
  describe('#get', function () {
    it('should get the value in array on the given index', function () {
      assert.equal([1, 2, 3][0], 1);
    });
  });
});