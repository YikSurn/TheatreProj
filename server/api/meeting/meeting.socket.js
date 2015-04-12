/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Meeting = require('./meeting.model');

exports.register = function(socket) {
  Meeting.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Meeting.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('meeting:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('meeting:remove', doc);
}