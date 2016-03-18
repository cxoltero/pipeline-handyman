/* global require, module */
'use strict';

var _ = require('lodash');
var del = require('del');
var fs = require('fs');
var util = require('gulp-util');

module.exports = {
  clean: clean,
  mergeConfig: mergeConfig,
  log: log,
  getPackageName: getPackageName,
  slugify: slugify
};

function clean(path, done) {
  return del.sync(path, done);
}

function mergeConfig(config, newConfig) {
  return _.merge({}, config, newConfig, replaceArrays);
}

function replaceArrays(a, b) {
  if (_.isArray(a)) {
    return b;
  }
}

function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        util.log(util.colors.blue(msg[item]));
      }
    }
  } else {
    util.log(util.colors.blue(msg));
  }
}

function getPackageName() {
  var packageJson = JSON.parse(fs.readFileSync('./package.json'));
  return packageJson.name;
}

function slugify(input) {
  return input
    .replace(/(\s*[\W]\s*)\s?/g, '-')
    .toLowerCase();
}