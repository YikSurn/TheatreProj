'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VenueallocationSchema = new Schema({
	ApplicationPeriodStartDate: Date,
	ApplicationPeriodEndDate: Date,
	AllocationFinalized: { type: Boolean, default: false }
});

module.exports = mongoose.model('Venueallocation', VenueallocationSchema);