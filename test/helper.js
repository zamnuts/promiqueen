'use strict';

var chai = require('chai').use(require('sinon-chai')).use(require('dirty-chai')),
    sinon = require('sinon');

module.exports = {
  expect: chai.expect,
  sinon: sinon
};
