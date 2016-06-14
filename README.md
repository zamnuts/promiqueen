# promiqueen

[![Travis](https://img.shields.io/travis/zamnuts/promiqueen.svg?maxAge=2592000)](https://travis-ci.org/zamnuts/promiqueen)
[![npm](https://img.shields.io/npm/v/promiqueen.svg?maxAge=2592000)](https://www.npmjs.com/package/promiqueen)
[![npm](https://img.shields.io/npm/l/promiqueen.svg?maxAge=2592000)](https://github.com/zamnuts/promiqueen/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/zamnuts/promiqueen.svg?style=social&label=Star&maxAge=2592000)](https://github.com/zamnuts/promiqueen)

A wrapper that detects if node-style callbacks are used.
After the wrapper is applied, if a callback is supplied then it is used,
but if a callback is missing (i.e. the last parameter is not a function),
then a BlueBird promise is used.

Use with regular objects:
```javascript
var promiqueen = require('promiqueen');

var context = {
    method: promiqueen(function(arg,callback) {
        callback(err,data);
    })
};

// ...

context.method('crown',function(err,data) {
    if ( err ) console.warn(err);
    console.log('data',data);
});

context.method('crown').then(function(data) {
    console.log('data',data);
}).catch(function(err) {
    console.warn(err);
});
```

Use with classes:
```javascript
var promiqueen = require('promiqueen');

var SomeClass = function() {};

SomeClass.prototype.method = promiqueen(function(arg,callback) {
    callback(err,data);
});

// ...

var instance = new SomeClass();

instance.method('crown',function(err,data) {
    if ( err ) console.warn(err);
    console.log('data',data);
});

instance.method('crown').then(function(data) {
    console.log('data',data);
}).catch(function(err) {
    console.warn(err);
});
```
