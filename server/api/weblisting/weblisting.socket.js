/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Weblisting = require('./weblisting.model');

exports.register = function(socket) {
  Weblisting.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Weblisting.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('weblisting:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('weblisting:remove', doc);
}