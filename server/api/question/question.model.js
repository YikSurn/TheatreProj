'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  title: String,
  text: String,
  answer: String,
  dateAsked: Date,
  dateAnswered: Date,
  askedbyUser_id: String,
  answeredbyUser_id: String,
  statusAnswered: String
});

module.exports = mongoose.model('Question', QuestionSchema);