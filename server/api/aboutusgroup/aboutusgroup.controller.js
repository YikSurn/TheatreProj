'use strict';

var _ = require('lodash');
var Aboutusgroup = require('./aboutusgroup.model');

// Get list of aboutusgroups limited to a given count
exports.limit = function(req, res) {
  Aboutusgroup.find({}).limit(req.params.count)
  .exec(function (err, aboutusgroups) {
    if(err) { return handleError(res, err); }
    return res.json(200, aboutusgroups);
  });
};

// Get list of aboutusgroups
exports.index = function(req, res) {
  Aboutusgroup.find(function (err, aboutusgroups) {
    if(err) { return handleError(res, err); }
    return res.json(200, aboutusgroups);
  });
};

// Get a single aboutusgroup
exports.show = function(req, res) {
  Aboutusgroup.findById(req.params.id, function (err, aboutusgroup) {
    if(err) { return handleError(res, err); }
    if(!aboutusgroup) { return res.send(404); }
    return res.json(aboutusgroup);
  });
};

// Creates a new aboutusgroup in the DB.
exports.create = function(req, res) {
  Aboutusgroup.create(req.body, function(err, aboutusgroup) {
    if(err) { return handleError(res, err); }
    return res.json(201, aboutusgroup);
  });
};

// Updates an existing aboutusgroup in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Aboutusgroup.findById(req.params.id, function (err, aboutusgroup) {
    if (err) { return handleError(res, err); }
    if(!aboutusgroup) { return res.send(404); }
    var updated = _.merge(aboutusgroup, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, aboutusgroup);
    });
  });
};

// Deletes a aboutusgroup from the DB.
exports.destroy = function(req, res) {
  Aboutusgroup.findById(req.params.id, function (err, aboutusgroup) {
    if(err) { return handleError(res, err); }
    if(!aboutusgroup) { return res.send(404); }
    aboutusgroup.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}