/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Prodmeeting = require('./prodmeeting.model');

exports.register = function(socket) {
  Prodmeeting.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Prodmeeting.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('prodmeeting:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('prodmeeting:remove', doc);
}