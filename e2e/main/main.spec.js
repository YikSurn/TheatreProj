
'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get('/');
    page = require('./main.po');
  });

  it('should load a valid page', function() {
    .expect(200);
    .end(function(err, res) {
        if (err) return done(err);

        done();

  });
});