import $ from 'jquery';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('ColPickComponentInput', function(hooks) {
  setupTest(hooks);

  test('it renders', function(assert) {
    assert.expect(2);

    var component = this.owner.factoryFor('component:col-pick-input').create();
    assert.equal(component._state, 'preRender');

    this.render();
    assert.equal(component._state, 'inDOM');
  });

  test('clicking within opens the popup', function(assert) {
    var component = this.owner.factoryFor('component:col-pick-input').create();

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

    var component = this.owner.factoryFor('component:col-pick-input').create();
    this.render();

    var target = {
      hideAction: function(){
        assert.ok(true, 'hide action was called!');
        done();
      }
    };

    component.set('onHide', 'hideAction');
    component.set('target', target);

    run(component.$(), 'trigger', 'click');
    run(component.$(), 'trigger', 'mousedown'); // simulate clicking outside
  });

  test('destroying no longer leaks the popup', function(assert) {
    var component = this.owner.factoryFor('component:col-pick-input').create();

    this.render();

    var popup = component.popup();

    run(component, 'destroy');

    assert.equal($(popup.selector).length, 0);
  });

  function style(selector, scope) {
    return $.trim($(selector, scope).attr('style'));
  }

  test("two way binding with colpick", function(assert) {
    var component = this.owner.factoryFor('component:col-pick-input').create();

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
    var component = this.owner.factoryFor('component:col-pick-input').create({
      useHashtag: true
    });

    this.render();

    var popup = component.popup();

    run(component, 'set', 'value', '#FFFFFF');

    assert.equal(run(component, 'get', 'previewValue'), '#ffffff');
    assert.equal(style('.colpick_new_color', popup), 'background-color: rgb(255, 255, 255);');
    assert.equal(style('.colpick_current_color', popup), 'background-color: rgb(255, 255, 255);');
  });
});
