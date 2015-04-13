'use strict';

var _ = require('lodash');
var Perftype = require('./perftype.model');

// Get list of perftypes
exports.index = function(req, res) {
  Perftype.find(function (err, perftypes) {
    if(err) { return handleError(res, err); }
    return res.json(200, perftypes);
  });
};

// Get a single perftype
exports.show = function(req, res) {
  Perftype.findById(req.params.id, function (err, perftype) {
    if(err) { return handleError(res, err); }
    if(!perftype) { return res.send(404); }
    return res.json(perftype);
  });
};

// Creates a new perftype in the DB.
exports.create = function(req, res) {
  Perftype.create(req.body, function(err, perftype) {
    if(err) { return handleError(res, err); }
    return res.json(201, perftype);
  });
};

// Updates an existing perftype in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Perftype.findById(req.params.id, function (err, perftype) {
    if (err) { return handleError(res, err); }
    if(!perftype) { return res.send(404); }
    var updated = _.merge(perftype, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, perftype);
    });
  });
};

// Deletes a perftype from the DB.
exports.destroy = function(req, res) {
  Perftype.findById(req.params.id, function (err, perftype) {
    if(err) { return handleError(res, err); }
    if(!perftype) { return res.send(404); }
    perftype.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}