(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var NxAudio = nx.Audio || require('@feizheng/next-audio');
  var DEFAULT_OPTIONS = { controls: true, autoplay: false };

  var NxAudioManager = nx.declare('nx.AudioManager', {
    methods: {
      init: function (inOptions) {
        var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
        this.el = new Audio();
        nx.mix(this.el, options);
        this.ctx = new NxAudio(this.el, options);
        document.body.appendChild(this.el);
      },
      destroy: function () {
        this.ctx.destroy();
        document.documentElement.remove(this.el);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAudioManager;
  }
})();
