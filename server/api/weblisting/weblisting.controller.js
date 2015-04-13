'use strict';

var _ = require('lodash');
var Weblisting = require('./weblisting.model');

// Get list of weblistings
exports.index = function(req, res) {
  Weblisting.find(function (err, weblistings) {
    if(err) { return handleError(res, err); }
    return res.json(200, weblistings);
  });
};

// Get a single weblisting
exports.show = function(req, res) {
  Weblisting.findById(req.params.id, function (err, weblisting) {
    if(err) { return handleError(res, err); }
    if(!weblisting) { return res.send(404); }
    return res.json(weblisting);
  });
};

// Creates a new weblisting in the DB.
exports.create = function(req, res) {
  Weblisting.create(req.body, function(err, weblisting) {
    if(err) { return handleError(res, err); }
    return res.json(201, weblisting);
  });
};

// Updates an existing weblisting in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Weblisting.findById(req.params.id, function (err, weblisting) {
    if (err) { return handleError(res, err); }
    if(!weblisting) { return res.send(404); }
    var updated = _.merge(weblisting, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, weblisting);
    });
  });
};

// Deletes a weblisting from the DB.
exports.destroy = function(req, res) {
  Weblisting.findById(req.params.id, function (err, weblisting) {
    if(err) { return handleError(res, err); }
    if(!weblisting) { return res.send(404); }
    weblisting.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}