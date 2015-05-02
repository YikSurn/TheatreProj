'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProdmeetingSchema = new Schema({
  title: { type: String, required: true},
  group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  info: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prodmeeting', ProdmeetingSchema);