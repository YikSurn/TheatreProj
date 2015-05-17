'use strict';

var express = require('express');
var controller = require('./prodmeeting.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/:groupName/:meetingTitle', auth.hasRole('admin'), controller.show);
router.post('/', controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;