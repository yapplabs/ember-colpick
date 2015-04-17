import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Ember from 'ember';

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

  Ember.run(component, 'destroy');

  assert.equal(Ember.$(popup.selector).length, 0);
});

function style(selector, scope) {
  return Ember.$.trim(Ember.$(selector, scope).attr('style'));
}

test("two way binding with colpick", function(assert) {
  var component = this.subject();

  this.render();

  var popup = component.popup();

  Ember.run(component, 'set', 'value', '000000');

  assert.equal(style('.colpick_new_color', popup), 'background-color: rgb(0, 0, 0);', 'a');
  assert.equal(style('.colpick_current_color', popup), 'background-color: rgb(0, 0, 0);', 'b');

  Ember.run(component, 'set', 'value', 'FFFFFF');

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
