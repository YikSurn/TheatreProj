'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
	Name: String,
	EstablishedDate: Date,
	// TODO OfficebearersID
	// TODO Other members
	WebsiteURL: String,
	FacebookURL: String,
	SocialMediaURL: String,
	AffiliationDate: Date
});

module.exports = mongoose.model('Group', GroupSchema);