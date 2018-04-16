import $ from 'jquery';
import { isPresent } from '@ember/utils';
import Mixin from '@ember/object/mixin';
import { observer } from '@ember/object';
import { schedule, bind } from '@ember/runloop';

function onRenderObserver(/*keys..., fn*/) {
  var args = Array.prototype.slice.call(arguments);
  var fn = args.slice(-1)[0];
  var keys = args.slice(0, -1);

  var observerFunction = function() {
    if (this._state !== 'inDOM') {
      // don't schedule unless inDOM
      return;
    }
    schedule('render', this, function() {
      // don't run unless still inDOM
      if (this._state === 'inDOM') {
        fn.call(this);
      }
    });
  };

  return observer.apply(null, keys.concat([observerFunction]));
}

export default Mixin.create( {
  colpickLayout: 'hex',
  colorScheme: 'dark',
  classNames: [ 'ember-col-pick' ],
  flat: true, // [true/false] render as popup (true) rendering inline (false)
  value: null,
  previewValue: null,
  useHashtag: false,

  _colpick: undefined,

  configDidChange: onRenderObserver('colorScheme', 'colpickLayout', 'flat', function(){
    this._tearDownColpick();
    this.rerender();
  }),

  valueDidChange: onRenderObserver('value', function() {
    var value = this.get('value');
    if (this._colpick && value) {
      this._colpick.colpickSetColor(value);
    }
  }),

  _setupColpick: function() {
    var layout = this.get('colpickLayout');
    var colorScheme = this.get('colorScheme');

    if (layout && colorScheme) {
      var colpick = this._colpick = this.$().colpick({
        layout: layout,
        colorScheme: colorScheme,
        submit: 0,
        flat: this.get('flat'),
        onChange: bind(this, function(hsb, hex) {
          if (this.get('useHashtag')) {
            hex = '#' + hex;
          }

          this.set('previewValue', hex);

          if (this._isValidPreviewValue()) {
            this.set('value', hex);
          }
        }),
        onHide: bind(this, function(){
          // eslint-disable-next-line ember/closure-actions
          this.sendAction('onHide');
        }),
        onShow: Ember.run.bind(this, function(el) {
          // Change the position of the colorpicker based on the window height
          let winHeight = this.$(window).outerHeight();
          let inputField = this.$();
          let inputFieldPosition = inputField.offset();
          let inputFieldHeight = inputField.outerHeight();
          let colorPickerElem = this.$(el);
          let colorPickerHeight = colorPickerElem.outerHeight();
          let colorPickerTop = 0;

          if (winHeight < (inputFieldPosition.top + inputFieldHeight + colorPickerHeight)) {
            colorPickerTop = inputFieldPosition.top - colorPickerHeight;
          } else {
            colorPickerTop = inputFieldPosition.top + inputFieldHeight;
          }
          colorPickerElem.css({
            'top': colorPickerTop + 'px'
          });
        })
      });

      colpick.find('input[type=text]').keyup(function() {
        var hexInputVal = this.value;
        if (hexInputVal.length === 6) {
          colpick.colpickSetColor(hexInputVal);
        }
      });

      var value = this.get('value');
      if (value) {
        colpick.colpickSetColor(value);
      }
    }
  },

  _isValidPreviewValue: function() {
    var previewHex = this.get('previewValue');
    var validityRegex = this.get('useHashtag') ? /^#[a-f0-9]{6}$/i : /^[a-f0-9]{6}$/i;
    return isPresent(previewHex.match(validityRegex));
  },

  popup: function() {
    if (this._state === 'inDOM') {
      return $('#' + this.$().data('colpickId'));
    }
  },

  didInsertElement: function () {
    this._super();
    this._setupColpick();
  },

  _tearDownColpick: function() {
    if (this._colpick) {
      if (!this.isDestroying) {
        this._colpick.colpickDestroy();
      }
      this._colpick = undefined;
    }
  },

  willDestroyElement: function () {
    this._tearDownColpick();
    this._super();
  }
});
