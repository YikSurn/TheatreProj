'use strict';

var _ = require('lodash');
var Theatre = require('./theatre.model');

// Get list of theatres
exports.index = function(req, res) {
  Theatre.find(function (err, theatres) {
    if(err) { return handleError(res, err); }
    return res.json(200, theatres);
  });
};

// Get a single theatre
exports.show = function(req, res) {
  Theatre.findById(req.params.id, function (err, theatre) {
    if(err) { return handleError(res, err); }
    if(!theatre) { return res.send(404); }
    return res.json(theatre);
  });
};

// Creates a new theatre in the DB.
exports.create = function(req, res) {
  Theatre.create(req.body, function(err, theatre) {
    if(err) { return handleError(res, err); }
    return res.json(201, theatre);
  });
};

// Updates an existing theatre in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Theatre.findById(req.params.id, function (err, theatre) {
    if (err) { return handleError(res, err); }
    if(!theatre) { return res.send(404); }
    var updated = _.merge(theatre, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, theatre);
    });
  });
};

// Deletes a theatre from the DB.
exports.destroy = function(req, res) {
  Theatre.findById(req.params.id, function (err, theatre) {
    if(err) { return handleError(res, err); }
    if(!theatre) { return res.send(404); }
    theatre.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}