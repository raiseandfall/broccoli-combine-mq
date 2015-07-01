/*jshint -W083 */

'use strict';

var fs = require('fs');
var path = require('path');
var Writer = require('broccoli-writer');
var globby = require('globby');
var combine = require('combine-mq');
var RSVP = require('rsvp');
var prettyBytes = require('pretty-bytes');
var extend = require('util')._extend;

var CombineMediaQueries = function CombineMediaQueries(inputTree, options) {
  if (!(this instanceof CombineMediaQueries)) {
    return new CombineMediaQueries(inputTree, options);
  }

  options = options || {};

  this.inputTree = inputTree;
  this.files = options.files || [];
  this.dest = options.dest || 'style.css';

  var defaultOptions = { source: '' };
  this.settings = extend(defaultOptions, options.settings || {});
};

CombineMediaQueries.prototype = Object.create(Writer.prototype);
CombineMediaQueries.prototype.Constructor = CombineMediaQueries;
CombineMediaQueries.prototype.write = function(readTree, destDir) {
  var self = this;

  return readTree(this.inputTree).then(function(srcDir) {
    return new RSVP.Promise(function(resolve, reject) {

      var fil = self.files.map(function(n) {
        return path.join(srcDir, n);
      });

      try {
        globby(fil, {}, function(err, files) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i],
              filename = file.split('/').pop();

            // Collect original filesize stats
            var stats = fs.statSync(file),
              originalByteSize = stats.size,
              originalFileSize = prettyBytes(originalByteSize);

            // Process source
            var fileContents = fs.readFileSync(file, {encoding:'utf8'});
            var processed = combine.parseCssString(fileContents, self.settings);
            var destFile = path.join(destDir, filename);
            fs.writeFileSync(destFile, processed, {encoding: 'utf8'});

            // Collect processed filesize stats
            var processedStats = fs.statSync(destFile),
              processedByteSize = processedStats.size,
              processedFileSize = prettyBytes(processedByteSize);

            console.log('File "' + destFile + '" created: ' + originalFileSize + ' → ' + processedFileSize);

            if (i === files.length - 1) {
              resolve();
            }
          }
        });
      } catch(e) {
        reject('Error -->', e);
      }
    });
  });
};

module.exports = CombineMediaQueries;
