'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StatusSchema = new Schema({
  statusName: String,
  statusDescription: String
});

module.exports = mongoose.model('Status', StatusSchema);