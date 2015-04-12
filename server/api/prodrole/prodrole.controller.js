'use strict';

var _ = require('lodash');
var Prodrole = require('./prodrole.model');

// Get list of prodroles
exports.index = function(req, res) {
  Prodrole.find(function (err, prodroles) {
    if(err) { return handleError(res, err); }
    return res.json(200, prodroles);
  });
};

// Get a single prodrole
exports.show = function(req, res) {
  Prodrole.findById(req.params.id, function (err, prodrole) {
    if(err) { return handleError(res, err); }
    if(!prodrole) { return res.send(404); }
    return res.json(prodrole);
  });
};

// Creates a new prodrole in the DB.
exports.create = function(req, res) {
  Prodrole.create(req.body, function(err, prodrole) {
    if(err) { return handleError(res, err); }
    return res.json(201, prodrole);
  });
};

// Updates an existing prodrole in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Prodrole.findById(req.params.id, function (err, prodrole) {
    if (err) { return handleError(res, err); }
    if(!prodrole) { return res.send(404); }
    var updated = _.merge(prodrole, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, prodrole);
    });
  });
};

// Deletes a prodrole from the DB.
exports.destroy = function(req, res) {
  Prodrole.findById(req.params.id, function (err, prodrole) {
    if(err) { return handleError(res, err); }
    if(!prodrole) { return res.send(404); }
    prodrole.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}