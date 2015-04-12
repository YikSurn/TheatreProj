'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MeetingSchema = new Schema({
  DressRehearsalDate: Date,
  IsDressPerformamce: String,
  OpeningPerformamceDate: Date,
  PerformanceDates: Array,
  PerformanceType: String,
  ShowDescription: String,
  IsInterval: String,
  Act1RunTime: String,
  Act2RunTime: String,
  CopyrightVerified: String,
  StudentParticipantNumber: Array,
  NonStudentParticipantNumber: Array
});

module.exports = mongoose.model('Meeting', MeetingSchema);