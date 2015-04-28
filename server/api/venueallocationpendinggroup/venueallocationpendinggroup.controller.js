'use strict';

var _ = require('lodash');
var Venueallocationpendinggroup = require('./venueallocationpendinggroup.model');

// Get list of venueallocationpendinggroups
exports.index = function(req, res) {
  Venueallocationpendinggroup
    .find()
    .populate({
      path: 'Group',
      select: 'Name -_id'
    })
    .exec(function (err, pendinggroups) {
      if (err) {return handleError(res, err); };
      return res.json(200, pendinggroups);
    });
};

// Get a single venueallocationpendinggroup
exports.show = function(req, res) {
  Venueallocationpendinggroup.findById(req.params.id, function (err, venueallocationpendinggroup) {
    if(err) { return handleError(res, err); }
    if(!venueallocationpendinggroup) { return res.send(404); }
    return res.json(venueallocationpendinggroup);
  });
};

// Creates a new venueallocationpendinggroup in the DB.
exports.create = function(req, res) {
  Venueallocationpendinggroup.create(req.body, function(err, venueallocationpendinggroup) {
    if(err) { return handleError(res, err); }
    return res.json(201, venueallocationpendinggroup);
  });
};

// Updates an existing venueallocationpendinggroup in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Venueallocationpendinggroup.findById(req.params.id, function (err, venueallocationpendinggroup) {
    if (err) { return handleError(res, err); }
    if(!venueallocationpendinggroup) { return res.send(404); }
    var updated = _.merge(venueallocationpendinggroup, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, venueallocationpendinggroup);
    });
  });
};

// Deletes a venueallocationpendinggroup from the DB.
exports.destroy = function(req, res) {
  Venueallocationpendinggroup.findById(req.params.id, function (err, venueallocationpendinggroup) {
    if(err) { return handleError(res, err); }
    if(!venueallocationpendinggroup) { return res.send(404); }
    venueallocationpendinggroup.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}