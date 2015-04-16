'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/meeting', function() {

  it('should return status 200', function(done) {
    request(app)
      .get('/api/meeting')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        done();
      });
  });
});