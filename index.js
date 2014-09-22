'use strict';
var path = require('path');

module.exports = {
  name: 'ember-colpick',
  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },
  included: function colpick_included(app) {
    this._super.included(app);
    this.app.import(app.bowerDirectory + '/colpick/js/colpick.js');
    this.app.import(app.bowerDirectory + '/colpick/css/colpick.css');
  }
};
