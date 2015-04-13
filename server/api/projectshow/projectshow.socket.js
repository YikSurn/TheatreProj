/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Projectshow = require('./projectshow.model');

exports.register = function(socket) {
  Projectshow.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Projectshow.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('projectshow:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('projectshow:remove', doc);
}