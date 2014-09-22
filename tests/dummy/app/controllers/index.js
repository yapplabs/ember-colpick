import Ember from 'ember';

export default Ember.Controller.extend({
  layouts: [
    'full',
    'hex',
    'rgbhex',
  ],
  colorSchemes: [
    'dark',
    'light'
  ]
});
