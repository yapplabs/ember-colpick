/* eslint-disable ember/no-classic-classes */
/* eslint-disable ember/no-mixins */
import TextField from '@ember/component/text-field';
import ColPickMixin from 'ember-colpick/mixins/col-pick';

export default TextField.extend(ColPickMixin, {
  flat: false,
});
