'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TheatreSchema = new Schema({
  name: String,
  address: String,
  capacity: Integer,
  equipment: {
    type: Array,
    default: ["projector", "stereo"]
  }
  functionality: Array,
  vacant_period: Array,
  book_period: Array,
  notes: String,
});

module.exports = mongoose.model('Theatre', TheatreSchema);