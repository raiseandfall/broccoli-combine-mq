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
      //builder.cleanup();
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
});
