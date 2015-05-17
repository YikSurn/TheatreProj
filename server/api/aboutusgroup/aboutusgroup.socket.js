/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Aboutusgroup = require('./aboutusgroup.model');

exports.register = function(socket) {
  Aboutusgroup.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Aboutusgroup.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('aboutusgroup:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('aboutusgroup:remove', doc);
}