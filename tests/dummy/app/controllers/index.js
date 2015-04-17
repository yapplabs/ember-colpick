import Ember from 'ember';

export default Ember.Controller.extend({
  colorScheme: 'dark',
  layout: 'full',
  layouts: Ember.A([
    'full',
    'hex',
    'rgbhex',
  ]),
  colorSchemes: Ember.A([
    'dark',
    'light'
  ])
});
