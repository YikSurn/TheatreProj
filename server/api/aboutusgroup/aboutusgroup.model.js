'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AboutusgroupSchema = new Schema({
	name: String,
	web: String,
	fb: String,
	contact: String,
	info: String
});

AboutusgroupSchema.statics = {
	loadFive: function(cb) {
		this.find({})
			.limit(5)
			.exec(cb);
	}
}

module.exports = mongoose.model('Aboutusgroup', AboutusgroupSchema);