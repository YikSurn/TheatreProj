'use strict';

var _ = require('lodash');
var Projectshow = require('./projectshow.model');

// Get list of projectshows
exports.index = function(req, res) {
  Projectshow.find(function (err, projectshows) {
    if(err) { return handleError(res, err); }
    return res.json(200, projectshows);
  });
};

// Get a single projectshow
exports.show = function(req, res) {
  Projectshow.findById(req.params.id, function (err, projectshow) {
    if(err) { return handleError(res, err); }
    if(!projectshow) { return res.send(404); }
    return res.json(projectshow);
  });
};

// Creates a new projectshow in the DB.
exports.create = function(req, res) {
  Projectshow.create(req.body, function(err, projectshow) {
    if(err) { return handleError(res, err); }
    return res.json(201, projectshow);
  });
};

// Updates an existing projectshow in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Projectshow.findById(req.params.id, function (err, projectshow) {
    if (err) { return handleError(res, err); }
    if(!projectshow) { return res.send(404); }
    var updated = _.merge(projectshow, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, projectshow);
    });
  });
};

// Deletes a projectshow from the DB.
exports.destroy = function(req, res) {
  Projectshow.findById(req.params.id, function (err, projectshow) {
    if(err) { return handleError(res, err); }
    if(!projectshow) { return res.send(404); }
    projectshow.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}