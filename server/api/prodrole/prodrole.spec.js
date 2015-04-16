'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/prodrole', function() {

  it('should return status 200', function(done) {
    request(app)
      .get('/api/prodrole')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        done();
      });
  });
});