'use strict';

var _ = require('lodash');
var Venueallocationrequest = require('./venueallocationrequest.model');

// Get list of venueallocationrequests
exports.index = function(req, res) {
  Venueallocationrequest.find().populate({
    path: 'Group',
    select: 'Name -_id'
  })
  .exec(function (err, venueallocationrequests) {
    if(err) { return handleError(res, err); }
    return res.json(200, venueallocationrequests);
  });
};

// Get a single venueallocationrequest
exports.show = function(req, res) {
  Venueallocationrequest.findById(req.params.id, function (err, venueallocationrequest) {
    if(err) { return handleError(res, err); }
    if(!venueallocationrequest) { return res.send(404); }
    return res.json(venueallocationrequest);
  });
};

// Creates a new venueallocationrequest in the DB.
exports.create = function(req, res) {
  Venueallocationrequest.create(req.body, function(err, venueallocationrequest) {
    if(err) { return handleError(res, err); }
    return res.json(201, venueallocationrequest);
  });
};

// Updates an existing venueallocationrequest in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Venueallocationrequest.findById(req.params.id, function (err, venueallocationrequest) {
    if (err) { return handleError(res, err); }
    if(!venueallocationrequest) { return res.send(404); }
    delete req.body.Group; // this was made lean and wasn't changed anyway.
    var updated = _.merge(venueallocationrequest, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, venueallocationrequest);
    });
  });
};

// Deletes a venueallocationrequest from the DB.
exports.destroy = function(req, res) {
  Venueallocationrequest.findById(req.params.id, function (err, venueallocationrequest) {
    if(err) { return handleError(res, err); }
    if(!venueallocationrequest) { return res.send(404); }
    venueallocationrequest.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}