'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WeblistingSchema = new Schema({
  show_id: String,
  group_id: String,
  booking_id: String,
  imageURL: String,
  bookingDate: Date,
  ticketURL: String,
  shortDescription: String,
  longDescription: String
});

module.exports = mongoose.model('Weblisting', WeblistingSchema);