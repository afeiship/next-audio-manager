/*!
 * name: @feizheng/next-audio-manager
 * description: Audio manager.
 * homepage: https://github.com/afeiship/next-audio-manager
 * version: 1.0.0
 * date: 2020-07-04T15:12:36.881Z
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var NxAudio = nx.Audio || require('@feizheng/next-audio');
  var DEFAULT_OPTIONS = { controls: true, autoplay: false };

  var NxAudioManager = nx.declare('nx.AudioManager', {
    methods: {
      init: function (inOptions) {
        this.options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
        this.element = new Audio();
        nx.mix(this.element, this.options);
        this.ctx = new NxAudio(this.element, this.options);
        document.body.appendChild(this.element);
      },
      destroy: function () {
        this.ctx.destroy();
        document.documentElement.remove(this.element);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAudioManager;
  }
})();

//# sourceMappingURL=next-audio-manager.js.map