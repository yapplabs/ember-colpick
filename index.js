'use strict';
const path = require('path');
const VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: require('./package').name,
  init() {
    this._super.init && this._super.init.apply(this, arguments);
    let checker = new VersionChecker(this);
    checker
      .for('ember-cli')
      .assertAbove(
        '2.15.0',
        'ember-colpick >= 1.0.0 is only supported in ember-cli >= 2.15.0. To fix, either downgrade ember-colpick or upgrade ember-cli.'
      );
  },
  blueprintsPath: function () {
    return path.join(__dirname, 'blueprints');
  },
  included: function colpick_included(app) {
    this._super.included.apply(this, arguments);
    if (!process.env.EMBER_CLI_FASTBOOT) {
      var colpickPath = path.join('vendor', 'jquery-colpick');

      app.import(path.join(colpickPath, 'colpick.js'));
      app.import(path.join(colpickPath, 'colpick.css'));
    }
  },
};
