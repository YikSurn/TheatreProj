'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookingSchema = new Schema({
  show_id: String,
  group_id: String,
  performanceType_id: String,
  venueAgreement_id: String,
  venueAgreementStatus: String,
  bookingDateStart: Date,
  bookingDateEnd: Date,
  isInternal: Boolean,
  treatre_id: String
});

module.exports = mongoose.model('Booking', BookingSchema);