'use strict';

var combineMq = require('../');
var expect = require('expect.js');
var broccoli = require('broccoli');
var fs = require('fs');
var path = require('path');

var builder;

describe('broccoli combine-mq', function() {
  afterEach(function() {
    if (builder) {
      builder.cleanup();
    }
  });

  it('should combine media queries from test.css', function() {
    var tree = combineMq('tests/fixtures', {
      files: ['*.css'],
      settings: {
        beautify: true
      }
    });

    builder = new broccoli.Builder(tree);

    return builder.build().then(function(dir) {
      var actual = fs.readFileSync(path.join(dir.directory, 'test.css'), {encoding: 'utf8'});
      var expected = fs.readFileSync('tests/mocks/test.css', {encoding: 'utf8'});
      expect(actual).to.equal(expected);
    });
  });

   it('should generate a CSS file with a smaller size', function() {
    var tree = combineMq('tests/fixtures', {
      files: ['*.css'],
      settings: {
        beautify: true
      }
    });

    builder = new broccoli.Builder(tree);

    return builder.build().then(function(dir) {
      var newStats = fs.statSync(path.join(dir.directory, 'test.css'));
      var oldStats = fs.statSync('tests/fixtures/test.css');
      expect(oldStats.size).to.be.greaterThan(newStats.size);

      newStats = fs.statSync(path.join(dir.directory, 'test-long.css'));
      oldStats = fs.statSync('tests/fixtures/test-long.css');
      expect(oldStats.size).to.be.greaterThan(newStats.size);
    });
  });

});
