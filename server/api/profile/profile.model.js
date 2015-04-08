'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  name: String,
  email: { type: String, lowercase: true },
  role: {
    type: String,
    default: 'user'
    },
  phone: {
    type: String,
    default: 'Not Provided'
    },
  addressHome: {
    type: String,
    default: 'Not Provided'
    },
  addressTerm: {
    type: String,
    default: 'Not Provided'
    },
});

module.exports = mongoose.model('Profile', ProfileSchema);