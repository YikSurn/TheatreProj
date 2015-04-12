'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectshowSchema = new Schema({
  showName: String,
  showStatus: String,
  prodMeeting_id: String,
  castList_DocumentID: String
});

module.exports = mongoose.model('Projectshow', ProjectshowSchema);