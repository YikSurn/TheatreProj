/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Perftype = require('./perftype.model');

exports.register = function(socket) {
  Perftype.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Perftype.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('perftype:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('perftype:remove', doc);
}