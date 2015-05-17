'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
	name: { type: String, required: true },
	establishedDate: Date,
	members: [String],
	websiteURL: String,
	facebookURL: String,
	socialMediaURL: String,
	affiliationDate: Date
});

module.exports = mongoose.model('Group', GroupSchema);