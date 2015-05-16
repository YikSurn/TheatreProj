'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AboutusgroupSchema = new Schema({
	name: String,
	web: [String],
	fb: [String],
	contact: [String],
	info: String
});

module.exports = mongoose.model('Aboutusgroup', AboutusgroupSchema);