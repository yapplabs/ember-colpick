import { click, fillIn, render, settled } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import RSVP from 'rsvp';

module('ColPickComponentInput', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<ColPickInput @appendTo='#ember-testing' />`);
    assert.dom('input.ember-col-pick').exists();
  });

  test('clicking within opens the popup', async function (assert) {
    await render(
      hbs`<ColPickInput @appendPickerTo='#ember-testing'  /><div class='another'></div>`
    );

    await click('input.ember-col-pick');
    assert.dom('.colpick').isVisible();

    await click('.another'); // simulate clicking outside
    assert.dom('.colpick').isNotVisible();
  });

  test('hiding fires the onHide action', async function (assert) {
    assert.expect(1);

    let deferred = RSVP.defer();
    this.set('onHide', function () {
      assert.ok(true, 'hide action was called!');
      deferred.resolve();
    });

    await render(
      hbs`<ColPickInput @appendPickerTo='#ember-testing' @onHide={{this.onHide}} /><div class='another'></div>`
    );

    await click('input.ember-col-pick');
    await click('.another'); // simulate clicking outside
    return deferred.promise;
  });

  test('destroying does not leak the popup element', async function (assert) {
    this.set('isShowing', true);
    await render(
      hbs`{{#if this.isShowing}}<ColPickInput @appendPickerTo='#ember-testing' />{{/if}}`
    );
    await click('input.ember-col-pick');
    assert.dom('.colpick').exists();
    this.set('isShowing', false);
    await settled();
    assert.dom('.colpick').doesNotExist();
  });

  test('updating @value', async function (assert) {
    this.set('value', '000000');
    await render(
      hbs`<ColPickInput @appendPickerTo='#ember-testing' @value={{this.value}} />`
    );
    await click('input.ember-col-pick');

    assert.dom('.colpick_new_color').hasStyle({
      'background-color': 'rgb(0, 0, 0)',
    });
    assert.dom('.colpick_current_color').hasStyle({
      'background-color': 'rgb(0, 0, 0)',
    });
    this.set('value', 'FFFFFF');
    await settled();
    assert.dom('.colpick_new_color').hasStyle({
      'background-color': 'rgb(255, 255, 255)',
    });
    assert.dom('.colpick_current_color').hasStyle({
      'background-color': 'rgb(255, 255, 255)',
    });
  });

  test('correctly updates value with hashtag when set', async function (assert) {
    this.set('value', '000000');
    await render(
      hbs`<ColPickInput @appendPickerTo='#ember-testing'  @value={{this.value}} />`
    );
    await fillIn('input.ember-col-pick', '#ff0000');
    assert.strictEqual(this.value, 'ff0000');
  });
});
