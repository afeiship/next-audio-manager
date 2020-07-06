(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var NxAudio = nx.Audio || require('@feizheng/next-audio');
  var DEFAULT_OPTIONS = { key: 'nxam', standalone: false };
  var MSG_KEY_CONFLICT = 'Key: %s conflict, please change one.'

  var NxAudioManager = nx.declare('nx.AudioManager', {
    statics: {
      contexts: [],
      create: function (inOptions) {
        if (Array.isArray(inOptions)) {
          return inOptions.map(function (option) {
            return this.create(option);
          }, this)
        }
        return new this(inOptions);
      },
      gets: function () {
        return this.contexts;
      },
      get: function (inKey) {
        var instances = this.gets();
        return instances.find(function (item) {
          return item.key === inKey;
        });
      },
      'method,property': function (inName) {
        return function () {
          var args = arguments;
          var instances = this.gets();
          return instances.map(function (instance) {
            var ctx = instance.value;
            return ctx[inName].apply(ctx, args);
          });
        };
      }
    },
    methods: {
      init: function (inOptions) {
        var options = this.options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
        var element = this.element = new Audio();
        var instances = NxAudioManager.gets();

        this.context = new NxAudio(element, options);
        nx.mix(element, options);

        var item = instances.find(function (item) { return item.key === options.key });
        if (item) return console.warn(MSG_KEY_CONFLICT, options.key);
        !options.standalone && instances.push({
          key: options.key,
          value: this
        });
      },
      method: function (inName) {
        var args = nx.slice(arguments, 1);
        var ctx = this.context;
        return ctx[inName].apply(ctx, args);
      },
      property: function (inName, inValue) {
        var ctx = this.context;
        if (typeof inValue === 'undefined') {
          return ctx[inName];
        }
        return ctx[inName] = inValue;
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAudioManager;
  }
})();
