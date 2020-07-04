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
        this.context = new NxAudio(this.element, this.options);
        document.body.appendChild(this.element);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAudioManager;
  }
})();
