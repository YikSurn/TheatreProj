'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectshowSchema = new Schema({
  showName: String,
  showStatus: String,
  group_id: String,
  venue_id: String,
  prodDate: Date,
  prodMeeting_id: String,
  castList_DocumentID: String
});

module.exports = mongoose.model('Projectshow', ProjectshowSchema);