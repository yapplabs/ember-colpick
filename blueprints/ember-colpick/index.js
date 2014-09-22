module.exports = {
  afterInstall: function(options) {
    return this.addBowerPackageToProject('colpick', '2.0.2');
  } 
};
