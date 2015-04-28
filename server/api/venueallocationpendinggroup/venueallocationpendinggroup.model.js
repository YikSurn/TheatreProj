'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

var VenueallocationpendinggroupSchema = new Schema({
	Group: {type: ObjectId, ref: 'Group'}
});

module.exports = mongoose.model('Venueallocationpendinggroup', VenueallocationpendinggroupSchema);