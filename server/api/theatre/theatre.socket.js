/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Theatre = require('./theatre.model');

exports.register = function(socket) {
  Theatre.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Theatre.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('theatre:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('theatre:remove', doc);
}