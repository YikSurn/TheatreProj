/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Prodteam = require('./prodteam.model');

exports.register = function(socket) {
  Prodteam.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Prodteam.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('prodteam:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('prodteam:remove', doc);
}