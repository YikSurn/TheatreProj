'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
  description: String,
  roleID: String, 
  assignedToUser_id: Array, 
  assignedByUser_id: String,
  deadline: String,
  status: String,
  comments: String,
  documents_id: Array,
  dateCreated: Date,
  show_id: String
});

module.exports = mongoose.model('Task', TaskSchema);