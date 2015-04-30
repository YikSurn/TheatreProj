'use strict';

var _ = require('lodash');
var Venueallocation = require('./venueallocation.model');

// Get list of venueallocations
exports.index = function(req, res) {
  Venueallocation.find(function (err, venueallocations) {
    if(err) { return handleError(res, err); }
    return res.json(200, venueallocations);
  });
};

// Get the most recent venueallocation (by ApplicationPeriodStartDate)
exports.mostRecent = function(req, res) {
  Venueallocation.find().sort({ApplicationPeriodStartDate: -1}).limit(1)
    .exec(function (err, venueallocations) {
      if(err) { return handleError(res, err); }
      return res.json(200, venueallocations[0]);
    });
}

// Get a single venueallocation
exports.show = function(req, res) {
  Venueallocation.findById(req.params.id, function (err, venueallocation) {
    if(err) { return handleError(res, err); }
    if(!venueallocation) { return res.send(404); }
    return res.json(venueallocation);
  });
};

// Creates a new venueallocation in the DB.
exports.create = function(req, res) {
  Venueallocation.create(req.body, function(err, venueallocation) {
    if(err) { return handleError(res, err); }
    return res.json(201, venueallocation);
  });
};

// Updates an existing venueallocation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Venueallocation.findById(req.params.id, function (err, venueallocation) {
    if (err) { return handleError(res, err); }
    if(!venueallocation) { return res.send(404); }
    var updated = _.merge(venueallocation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, venueallocation);
    });
  });
};

// Deletes a venueallocation from the DB.
exports.destroy = function(req, res) {
  Venueallocation.findById(req.params.id, function (err, venueallocation) {
    if(err) { return handleError(res, err); }
    if(!venueallocation) { return res.send(404); }
    venueallocation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}