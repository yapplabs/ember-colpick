import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('ColPickComponent', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<ColPick />`);
    assert.dom('.ember-col-pick .colpick').exists();
  });

  test('destroying does not leak the popup', async function (assert) {
    this.set('isShowing', true);
    await render(hbs`{{#if this.isShowing}}<ColPick />{{/if}}`);
    assert.dom('.ember-col-pick .colpick').exists();
    this.set('isShowing', false);
    await settled();
    assert.dom('.ember-col-pick .colpick').doesNotExist();
  });

  test('updating @value', async function (assert) {
    this.set('value', '000000');
    await render(hbs`<ColPick @value={{this.value}} />`);

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

  test('sets the color by typing into the input', async function (assert) {
    this.set('value', '000000');
    await render(hbs`<ColPick @value={{this.value}} />`);
    await fillIn('.colpick_hex_field input', 'ff0000');
    assert.strictEqual(this.value, 'ff0000');
  });
});
