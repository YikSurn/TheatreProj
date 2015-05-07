'use strict';

angular.module('theatreProjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('group', {
        url: '/group',
        templateUrl: 'app/groups/view-group/view-group.html',
        controller: 'ViewGroupCtrl'
      });
  });