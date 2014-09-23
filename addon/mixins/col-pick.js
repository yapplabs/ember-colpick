import Ember from 'ember';

function onRenderObserver(/*keys..., fn*/) {
  var args = Array.prototype.slice.call(arguments);
  var fn = args.slice(-1)[0];
  var keys = args.slice(0, -1);

  var observer = function() {
    var view = this;
    var state = view._state;

    if (state === 'inDOM') {
      // don't schedule unless inDOM
      Ember.run.schedule('render', this, function() {
        // don't run unless still inDOM
        if (this._state === 'inDOM') {
          fn.call(this);
        }
      });
    }
  };

  return Ember.observer.apply(null, keys.concat([observer]));
}

export default Ember.Mixin.create( {
  colpickLayoutName: 'hex',
  colorScheme: 'dark',
  classNames: [ 'ember-col-pick' ],
  flat: true, // [true/false] render as popup (true) rendering inline (false)
  value: null,
  previewValue: null,

  _colpick: undefined,

  configDidChange: onRenderObserver('colorScheme', 'layoutName', 'flat', function(){
    this._tearDownColpick();
    this.rerender();
  }),

  valueDidChange: onRenderObserver('value', function() {
    if (this._colpick) {
      this._colpick.colpickSetColor(this.get('value'));
    }
  }),

  _setupColpick: function() {
    var layout = this.get('colpickLayoutName');
    var colorScheme = this.get('colorScheme');

    if (layout && colorScheme) {
      var colpick = this._colpick = this.$().colpick({
        layout: layout,
        colorScheme: colorScheme,
        submit: 0,
        flat: this.get('flat'),
        onChange: Ember.run.bind(this, function(hsb, hex, rgb, el, bySetColor) {
          this.set('previewValue', hex);

          if (!bySetColor) {
            this.set('value', hex);
          }
        })
      }).keyup(function() {
        colpick.colpickSetColor(this.value);
      });

      var value = this.get('value');
      if (value) {
        colpick.colpickSetColor(value);
      }
    }
  },

  popup: function() {
    if (this._state === 'inDOM') {
      return Ember.$('#' + this.$().data('colpickId'));
    }
  },

  didInsertElement: function () {
    this._setupColpick();
  },

  _tearDownColpick: function() {
    if (this._colpick) {
      this.popup().remove();
      this._colpick = undefined;
    }
  },

  willDestroyElement: function () {
    this._tearDownColpick();
  }
});

