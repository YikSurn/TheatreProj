'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

var VenueallocationrequestSchema = new Schema({
	ProjectID: ObjectId,
	BookingStartDate: Date,
	BookingEndDate: Date,
	Approved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Venueallocationrequest', VenueallocationrequestSchema);