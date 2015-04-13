'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProdroleSchema = new Schema({
  roleName: String,
  roleDescription: String
});

module.exports = mongoose.model('Prodrole', ProdroleSchema);