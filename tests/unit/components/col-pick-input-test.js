import $ from 'jquery';
import { run } from '@ember/runloop';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('col-pick-input', 'ColPickComponentInput', {
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

test('clicking within opens the popup', function(assert) {
  var component = this.subject();

  this.render();

  var popup = component.popup();
  assert.ok(!popup.is(':visible'), 'expected popup NOT to be visible');

  run(component.$(), 'trigger', 'click');
  assert.ok(popup.is(':visible'), 'expected popup to be visible');

  run(component.$(), 'trigger', 'mousedown'); // simulate clicking outside
  assert.ok(!popup.is(':visible'), 'expected popup to be visible');
});

test('hiding fires the onHide action', function(assert) {
  var done = assert.async();
  assert.expect(1);

  var component = this.subject();
  this.render();

  var targetObject = {
    hideAction: function(){
      assert.ok(true, 'hide action was called!');
      done();
    }
  };

  component.set('onHide', 'hideAction');
  component.set('targetObject', targetObject);

  run(component.$(), 'trigger', 'click');
  run(component.$(), 'trigger', 'mousedown'); // simulate clicking outside
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

test("correctly updates value with hashtag when set", function(assert) {
  var component = this.subject({
    useHashtag: true
  });
  
  this.append();
  
  var popup = component.popup();
  
  run(component, 'set', 'value', '#FFFFFF');
  
  assert.equal(run(component, 'get', 'previewValue'), '#ffffff');
  assert.equal(style('.colpick_new_color', popup), 'background-color: rgb(255, 255, 255);');
  assert.equal(style('.colpick_current_color', popup), 'background-color: rgb(255, 255, 255);');
});
