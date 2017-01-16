'use strict';

var Promise = require('bluebird');

/**
 * A wrapper that detects if node-style callbacks are used.
 * @returns {Promise|*} Returns the promise if node-style callbacks are omitted, otherwise the result of the callback.
 */
var promiqueen = function() {
  var argv = Array.prototype.slice.call(arguments,0);
  var fn = argv.pop();
  var context = argv.shift() || null; // context is optional
  var pfn = Promise.promisify(fn); // pre-cache the promisified function
  return function() { // return the logic wrapper
    var argv = Array.prototype.slice.call(arguments,0);
    if ( typeof argv[argv.length - 1] === 'function' ) { // is the last argument a function? if so, assume callback
      return fn.apply(context || this,argv);
    } else { // not using node-style callback syntax, use the promisified version
      return pfn.apply(context || this,argv);
    }
  };
};

module.exports = promiqueen;
