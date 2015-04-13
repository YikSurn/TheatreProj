'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProdteamSchema = new Schema({
  name: String,
  email: Array,
  phone: Array,
  is_Student: Boolean,
  role: String,
  prodMeeting_id: String
});

module.exports = mongoose.model('Prodteam', ProdteamSchema);