'use strict';

var _ = require('lodash');
var Meeting = require('./meeting.model');

// Get list of meetings
exports.index = function(req, res) {
  Meeting.find(function (err, meetings) {
    if(err) { return handleError(res, err); }
    return res.json(200, meetings);
  });
};

// Get a single meeting
exports.show = function(req, res) {
  Meeting.findById(req.params.id, function (err, meeting) {
    if(err) { return handleError(res, err); }
    if(!meeting) { return res.send(404); }
    return res.json(meeting);
  });
};

// Creates a new meeting in the DB.
exports.create = function(req, res) {
  Meeting.create(req.body, function(err, meeting) {
    if(err) { return handleError(res, err); }
    return res.json(201, meeting);
  });
};

// Updates an existing meeting in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Meeting.findById(req.params.id, function (err, meeting) {
    if (err) { return handleError(res, err); }
    if(!meeting) { return res.send(404); }
    var updated = _.merge(meeting, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, meeting);
    });
  });
};

// Deletes a meeting from the DB.
exports.destroy = function(req, res) {
  Meeting.findById(req.params.id, function (err, meeting) {
    if(err) { return handleError(res, err); }
    if(!meeting) { return res.send(404); }
    meeting.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}