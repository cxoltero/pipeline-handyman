/* jshint expr: true */
/* exported should */

'use strict';

var handyman = require('../');
var should = require('chai').should();
var packageName = require('../package.json').name;

describe('gulp-handyman', function () {

  describe('Update configuration', function () {
    var defaultConfig, newConfig;

    beforeEach(function () {
      defaultConfig = {
        key1: 'test',
        key2: true
      };
      newConfig = {
        key1: 'userKey'
      };
    });

    it('Should update the default configuration', function () {

      var updatedConf = handyman.updateConf(defaultConfig, newConfig);

      updatedConf.key1.should.equal('userKey');
      updatedConf.key2.should.be.true;
    });

    it('Should replace arrays if necessary', function () {
      defaultConfig.key3 = ['A1'];
      newConfig.key3 = ['A2', 'A1'];
      var updatedConf = handyman.updateConf(defaultConfig, newConfig);
      updatedConf.key1.should.equal('userKey');
      updatedConf.key2.should.be.true;
      updatedConf.key3.should.eql(['A2', 'A1']);
    });

  });

  describe('Get package name', function () {

    it('Should get package name from package.json', function () {

      var handyPackageName = handyman.getPackageName();

      handyPackageName.should.equal(packageName);
    });

  });

});