/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Prodrole = require('./prodrole.model');

exports.register = function(socket) {
  Prodrole.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Prodrole.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('prodrole:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('prodrole:remove', doc);
}