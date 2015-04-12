'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProdteamSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  is_Student: Boolean,
  role: String,
  prodMeeting_id: Integer
});

module.exports = mongoose.model('Prodteam', ProdteamSchema);