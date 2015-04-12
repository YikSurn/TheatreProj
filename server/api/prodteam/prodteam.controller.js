'use strict';

var _ = require('lodash');
var Prodteam = require('./prodteam.model');

// Get list of prodteams
exports.index = function(req, res) {
  Prodteam.find(function (err, prodteams) {
    if(err) { return handleError(res, err); }
    return res.json(200, prodteams);
  });
};

// Get a single prodteam
exports.show = function(req, res) {
  Prodteam.findById(req.params.id, function (err, prodteam) {
    if(err) { return handleError(res, err); }
    if(!prodteam) { return res.send(404); }
    return res.json(prodteam);
  });
};

// Creates a new prodteam in the DB.
exports.create = function(req, res) {
  Prodteam.create(req.body, function(err, prodteam) {
    if(err) { return handleError(res, err); }
    return res.json(201, prodteam);
  });
};

// Updates an existing prodteam in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Prodteam.findById(req.params.id, function (err, prodteam) {
    if (err) { return handleError(res, err); }
    if(!prodteam) { return res.send(404); }
    var updated = _.merge(prodteam, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, prodteam);
    });
  });
};

// Deletes a prodteam from the DB.
exports.destroy = function(req, res) {
  Prodteam.findById(req.params.id, function (err, prodteam) {
    if(err) { return handleError(res, err); }
    if(!prodteam) { return res.send(404); }
    prodteam.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}