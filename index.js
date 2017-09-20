'use strict';
var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var map = require('broccoli-stew').map;

module.exports = {
  name: 'ember-colpick',
  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },
  treeForVendor(defaultTree) {
    var trees = [];

    if (defaultTree) {
      trees.push(defaultTree);
    }

    var browserVendorLib = new Funnel(path.join(this.app.bowerDirectory, 'colpick', 'js'), {
      files: ['colpick.js'],
      destDir: 'colpick'
    });

    browserVendorLib = map(browserVendorLib, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);
    trees.push(browserVendorLib);
    return new mergeTrees(trees);
  },
  included: function colpick_included(app) {
    this._super.included.apply(this, arguments);
    this.app.import(path.join('vendor', 'colpick',  'colpick.js'));
    this.app.import(path.join(app.bowerDirectory, 'colpick', 'css', 'colpick.css'));
  }
};
