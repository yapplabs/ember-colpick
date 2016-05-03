'use strict';
var path = require('path');

module.exports = {
  name: 'ember-colpick',
  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },
  included: function colpick_included(app) {
    this._super.included.apply(this, arguments);
    if(!process.env.EMBER_CLI_FASTBOOT) {
      var colpickPath = path.join(app.bowerDirectory, 'colpick');

      this.app.import(path.join(colpickPath, 'js',  'colpick.js'));
      this.app.import(path.join(colpickPath, 'css', 'colpick.css'));
    }
  }
};
