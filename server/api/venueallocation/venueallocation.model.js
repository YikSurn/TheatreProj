'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DateRanges = new Schema({
	StartDate: Date,
	EndDate: Date
});

var VenueallocationSchema = new Schema({
	ApplicationPeriodStartDate: Date,
	ApplicationPeriodEndDate: Date,
	SemesterOneDateRanges: [DateRanges],
	SemesterTwoDateRanges: [DateRanges],
	AllocationFinalized: { type: Boolean, default: false }
});

module.exports = mongoose.model('Venueallocation', VenueallocationSchema);