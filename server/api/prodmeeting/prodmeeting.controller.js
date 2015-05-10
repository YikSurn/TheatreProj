'use strict';

var _ = require('lodash');
var Prodmeeting = require('./prodmeeting.model');
var Group = require('../group/group.model');

// Get list of prodmeetings
exports.index = function(req, res) {
  Prodmeeting.find({}).populate('group').exec(function (err, prodmeetings) {
    if(err) { return handleError(res, err); }
    return res.json(200, prodmeetings);
  });
};

// Get a single prodmeeting
exports.show = function(req, res) {
  Group.findOne({ 'name' : req.params.groupName }, function (err, group) {
    if(err) { return handleError(res, err); }
    Prodmeeting.findOne({ 'group' : group._id, 'title' : req.params.meetingTitle }).populate('group').exec(function (err, prodmeeting) {
      if(err) { return handleError(res, err); }
      if(!prodmeeting) { return res.send(404); }
      return res.json(200, prodmeeting);
    });
  });
};

// Creates a new prodmeeting in the DB.
exports.create = function(req, res) {
  Prodmeeting.create(req.body, function (err, prodmeeting) {
    if(err) { return handleError(res, err); }
    Prodmeeting.findById(prodmeeting._id).populate('group').exec(function (err, prodmeeting) {
      return res.json(201, prodmeeting);
    });
  });
};

// Updates an existing prodmeeting in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Prodmeeting.findById(req.params.id, function (err, prodmeeting) {
    if (err) { return handleError(res, err); }
    if(!prodmeeting) { return res.send(404); }
    var updated = _.extend(prodmeeting, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      Prodmeeting.findById(prodmeeting._id).populate('group').exec(function (err, prodmeeting) {
        if (err) { return handleError(res, err); }
        return res.json(200, prodmeeting);
      });
    });
  });
};

// Deletes a prodmeeting from the DB.
exports.destroy = function(req, res) {
  Prodmeeting.findById(req.params.id, function (err, prodmeeting) {
    if(err) { return handleError(res, err); }
    if(!prodmeeting) { return res.send(404); }
    prodmeeting.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}