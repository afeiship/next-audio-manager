(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var NxAudio = nx.Audio || require('@feizheng/next-audio');
  var DEFAULT_OPTIONS = { key: 'nxam', standalone: false, controls: true, autoplay: false };
  var MSG_KEY_CONFLICT = 'Key conflict, please change one.'

  var NxAudioManager = nx.declare('nx.AudioManager', {
    statics: {
      _instances: [],
      create: function (inOptions) {
        if (Array.isArray(inOptions)) {
          return inOptions.map(function (option) {
            return this.create(option);
          }, this)
        }
        return new this(inOptions);
      },
      gets: function () {
        return this._instances;
      },
      get: function (inKey) {
        var instances = this.gets();
        return instances.find(function (item) {
          return item.key === inKey;
        });
      },
      call: function (inName) {
        var instances = this.gets();
        var args = nx.slice(arguments, 1);
        return instances.map(function (instance) {
          var ctx = instance.context;
          return ctx[inName].apply(ctx, args);
        });
      }
    },
    methods: {
      init: function (inOptions) {
        var options = this.options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
        var element = this.element = new Audio();
        var context = this.context = new NxAudio(element, options);
        var instances = NxAudioManager._instances;

        nx.mix(element, options);

        var item = instances.find(function (item) { return item.key === options.key });
        if (item) nx.error(MSG_KEY_CONFLICT);
        !options.standalone && NxAudioManager._instances.push({
          key: options.key,
          element: element,
          context: context,
          options: options
        });
      },
      call: function (inName) {
        var args = nx.slice(arguments, 1);
        var ctx = this.context;
        return ctx[inName].apply(ctx, args);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAudioManager;
  }
})();
