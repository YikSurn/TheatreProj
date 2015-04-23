/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/venueallocationrequests', require('./api/venueallocationrequest'));
  app.use('/api/venueallocation', require('./api/venueallocation'));
  app.use('/api/questions', require('./api/question'));
  app.use('/api/weblistings', require('./api/weblisting'));
  app.use('/api/tasks', require('./api/task'));
  app.use('/api/bookings', require('./api/booking'));
  app.use('/api/projectshows', require('./api/projectshow'));
  app.use('/api/statuss', require('./api/status'));
  app.use('/api/prodroles', require('./api/prodrole'));
  app.use('/api/perftypes', require('./api/perftype'));
  app.use('/api/prodteams', require('./api/prodteam'));
  app.use('/api/theatres', require('./api/theatre'));
  app.use('/api/meetings', require('./api/meeting'));
  app.use('/api/profiles', require('./api/profile'));
  app.use('/api/groups', require('./api/group'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
