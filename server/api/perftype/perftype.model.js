'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PerftypeSchema = new Schema({
  performanceLetterCode: String,
  performanceName: String,
  performamceDescription: String
});

module.exports = mongoose.model('Perftype', PerftypeSchema);