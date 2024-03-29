'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

var VenueallocationrequestSchema = new Schema({
	Group: {type: ObjectId, ref: 'Group'},
	VenueAllocation: ObjectId,
	RangeIndex: Number,
	Approved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Venueallocationrequest', VenueallocationrequestSchema);