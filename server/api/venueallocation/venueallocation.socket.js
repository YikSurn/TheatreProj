/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Venueallocation = require('./venueallocation.model');

exports.register = function(socket) {
  Venueallocation.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Venueallocation.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('venueallocation:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('venueallocation:remove', doc);
}