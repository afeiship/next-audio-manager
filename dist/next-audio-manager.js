/*!
 * name: @feizheng/next-audio-manager
 * description: Audio manager.
 * homepage: https://github.com/afeiship/next-audio-manager
 * version: 1.0.2
 * date: 2020-07-05T10:05:00.014Z
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var NxAudio = nx.Audio || require('@feizheng/next-audio');
  var DEFAULT_OPTIONS = { key: 'nxam', controls: true, autoplay: false };

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
      invoke: function (inName) {
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

        nx.mix(element, options);

        NxAudioManager._instances.push({
          key: options.key,
          element: element,
          context: context,
          options: options
        });
      },
      invoke: function (inName) {
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

//# sourceMappingURL=next-audio-manager.js.map
