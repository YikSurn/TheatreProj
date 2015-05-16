/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Venueallocationrequest = require('./venueallocationrequest.model');

exports.register = function(socket) {
  Venueallocationrequest.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Venueallocationrequest.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('venueallocationrequest:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('venueallocationrequest:remove', doc);
}