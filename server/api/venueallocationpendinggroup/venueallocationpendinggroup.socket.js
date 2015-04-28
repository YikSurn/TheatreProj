/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Venueallocationpendinggroup = require('./venueallocationpendinggroup.model');

exports.register = function(socket) {
  Venueallocationpendinggroup.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Venueallocationpendinggroup.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('venueallocationpendinggroup:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('venueallocationpendinggroup:remove', doc);
}