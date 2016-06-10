'use strict';

var expect = require('../helper').expect;

describe('promiqueen',function() {
  var promiqueen = require('../../lib/promiqueen');

  describe('namespace',function() {
    it('should have the main function',function() {
      expect(promiqueen).to.be.a('function');
    });
  });

  describe('functional: class',function() {
    beforeEach(function() {
      var C = function(){};
      C.prototype._private = function(param,cb) {
        setImmediate(function() {
          cb(null,true);
        });
      };
      C.prototype.public = promiqueen(function(param,cb) {
        var argv = Array.prototype.slice.call(arguments,0);
        cb = argv.pop();
        param = argv.shift() || null;
        this._private(param,cb);
      });
      this.C = C;
    });

    it('should work for callback (with param)',function(done) {
      var c = new this.C();
      c.public('crown',function(err,data) {
        expect(err).to.be.null();
        expect(data).to.be.true();
        done();
      });
    });

    it('should work for callback (no param)',function(done) {
      var c = new this.C();
      c.public(function(err,data) {
        expect(err).to.be.null();
        expect(data).to.be.true();
        done();
      });
    });

    it('should work for promise (with param)',function(done) {
      var c = new this.C();
      c.public('crown').then(function(data) {
        expect(data).to.be.true();
        done();
      });
    });

    it('should work for promise (no param)',function(done) {
      var c = new this.C();
      c.public().then(function(data) {
        expect(data).to.be.true();
        done();
      });
    });
  });

  describe('functional: object',function() {
    beforeEach(function() {
      this.c = {
        _private: function(param,cb) {
          setImmediate(function() {
            cb(null,true);
          });
        },
        public: promiqueen(function(param,cb) {
          var argv = Array.prototype.slice.call(arguments,0);
          cb = argv.pop();
          param = argv.shift() || null;
          this._private(param,cb);
        })
      };
    });

    it('should work for callback (with param)',function(done) {
      this.c.public('crown',function(err,data) {
        expect(err).to.be.null();
        expect(data).to.be.true();
        done();
      });
    });

    it('should work for callback (no param)',function(done) {
      this.c.public(function(err,data) {
        expect(err).to.be.null();
        expect(data).to.be.true();
        done();
      });
    });

    it('should work for promise (with param)',function(done) {
      this.c.public('crown').then(function(data) {
        expect(data).to.be.true();
        done();
      });
    });

    it('should work for promise (no param)',function(done) {
      this.c.public().then(function(data) {
        expect(data).to.be.true();
        done();
      });
    });
  });
});
