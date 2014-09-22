import Ember from 'ember';

function afterRenderObserver(/*keys..., fn*/) {
  var args = Array.prototype.slice.call(arguments);
  var fn = args.slice(-1)[0];
  var keys = args.slice(0, -1);

  var observer = function() {
    var view = this;
    var state = view._state;

    if (state === 'inDOM') {
      // don't schedule unless inDOM
      Ember.run.scheduleOnce('afterRender', this, function(){
        // don't run unless still inDOM
        if (this._state === 'inDOM') {
          fn.call(this);
        }
      });
    }
  };
 
  var args = keys.concat([observer]);
 
  return Ember.observer.apply(null, args);
}

export default Ember.TextField.extend({
  layoutName: 'hex',
  colorScheme: 'dark',

  value: null,
  previewValue: null,

  _colpick: undefined,

  configDidChange: afterRenderObserver('colorScheme', 'layoutName', function(){
    this._tearDownColpick();
    this.rerender();
  }),

  valueDidChange: afterRenderObserver('value', function() {
    if (this._colpick) {
      this._colpick.colpickSetColor(this.get('value'));
    }
  }),

  _setupColpick: function() {
    var component = this;

    var layout = this.get('layoutName');
    var colorScheme = this.get('colorScheme');

    if (layout && colorScheme) {
      var colpick = this._colpick = this.$().colpick({
        layout: layout,
        colorScheme: colorScheme,
        submit: 0,
        onChange: Ember.run.bind(this, function(hsb, hex, rgb, el, bySetColor) {
          this.set('previewValue', hex);

          if (!bySetColor) {
            this.$().val(hex);
          }
        })
      }).keyup(function() {
        colpick.colpickSetColor(this.value);
      });
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
