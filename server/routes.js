/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/aboutusgroups', require('./api/aboutusgroup'));
  app.use('/api/prodmeetings', require('./api/prodmeeting'));
  app.use('/api/venueallocationrequests', require('./api/venueallocationrequest'));
  app.use('/api/venueallocation', require('./api/venueallocation'));
  app.use('/api/tasks', require('./api/task'));
  app.use('/api/projectshows', require('./api/projectshow'));
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
