'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: String,
  establishedDate: Date,
  members: Array,
  websiteURL: String,
  facebookURL: String,
  socialMediaURL: String,
  affiliationDate: Date
});

module.exports = mongoose.model('Group', GroupSchema);