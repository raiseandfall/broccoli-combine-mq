# Broccoli Combine Media Queries  [![Build Status](https://travis-ci.org/raiseandfall/broccoli-combine-mq.svg)](https://travis-ci.org/raiseandfall/broccoli-combine-mq)

> Broccoli plugin to combine media queries
> Wrapping [node-combine-mq](https://github.com/frontendfriends/node-combine-mq)

## [CHANGELOG](./CHANGELOG.md)

## INSTALL

```shell
$ npm install broccoli-combine-mq
```

## USAGE
```javascript
var combineMq = require('broccoli-combine-mq');

var tree = combineMq(app, {
  files: ['style.css'],
  settings: {
    beautify: true
  }
});
```

## OPTIONS

### combineMq(tree, options)

#### options.files
Type: `Array`  
_Optional_  
**Default** ```[*.css]```

Path to the CSS files to apply combine-mq to.

#### options.settings
Type: `Object`  
_Optional_  

Settings for [node-combine-mq](https://github.com/frontendfriends/node-combine-mq)

## CONTRIBUTE
```shell
$ npm run dev
```

## LICENSE
MIT
