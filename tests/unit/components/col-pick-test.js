import $ from 'jquery';
import { run } from '@ember/runloop';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('col-pick', 'ColPickComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function(assert) {
  assert.expect(2);

  var component = this.subject();
  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');
});

test('the popup is rendered inline', function(assert) {
  var component = this.subject();

  this.render();

  var popup = component.popup();

  assert.equal(component.$(popup.selector).length, 1, 'is a child');

  assert.ok(popup.is(':visible'), 'expected popup to be visible');
});

test('destroying no longer leaks the popup', function(assert) {
  var component = this.subject();

  this.render();

  var popup = component.popup();

  run(component, 'destroy');

  assert.equal($(popup.selector).length, 0);
});

function style(selector, scope) {
  return $.trim($(selector, scope).attr('style'));
}

test("two way binding with colpick", function(assert) {
  var component = this.subject();

  this.render();

  var popup = component.popup();

  run(component, 'set', 'value', '000000');

  assert.equal(style('.colpick_new_color', popup), 'background-color: rgb(0, 0, 0);', 'a');
  assert.equal(style('.colpick_current_color', popup), 'background-color: rgb(0, 0, 0);', 'b');

  run(component, 'set', 'value', 'FFFFFF');

  assert.equal(style('.colpick_new_color', popup), 'background-color: rgb(255, 255, 255);');
  assert.equal(style('.colpick_current_color', popup), 'background-color: rgb(255, 255, 255);');
});


test("correctly renders initial bound value", function(assert) {
  var component = this.subject({
    value: 'FFFFFF'
  });

  this.render();

  var popup = component.popup();

  assert.equal(style('.colpick_new_color', popup), 'background-color: rgb(255, 255, 255);');
  assert.equal(style('.colpick_current_color', popup), 'background-color: rgb(255, 255, 255);');
});

test('sets the color only if a valid color is typed into the input', function(assert) {
  var component = this.subject();
  this.render();

  component.popup();

  run(function() {
    component.$('.colpick_hex_field input').val('ff000').keyup();
  });
  assert.equal(component.get('value'), null, 'After receiving five hex characters we do not yet have a valid color to set');

  run(function() {
    component.$('.colpick_hex_field input').val('ff0000').keyup();
  });
  assert.equal(component.get('value'), 'ff0000', 'After receiving six hex characters the color is set');
});
