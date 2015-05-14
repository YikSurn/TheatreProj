'use strict';

angular.module('theatreProjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('group', {
        url: '/groups/{name}',
        templateUrl: 'app/groups/view-group/view-group.html',
        controller: 'ViewGroupCtrl',
        resolve: {
          groupPromise: ['$stateParams', 'theatreGroups', 
          function ($stateParams, theatreGroups) {
            return theatreGroups.get($stateParams.name);
          }]
        }
      });
  });