(function() {
  var nx = require('@feizheng/next-js-core2');
  var NxAudioManager = require('../src/next-audio-manager');

  describe('NxAudioManager.methods', function() {
    test('init', function() {
      var data = {
        key: 1,
        value: 2
      };
      expect(!!data).toBe(true);
    });
  });
})();
